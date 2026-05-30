import { addDoc, collection, doc, updateDoc, serverTimestamp, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../lib/firebase";

// Helper to sanitize filenames
const sanitize = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, "_");

async function uploadDriverDoc(driverId: string, docType: "DL" | "MEDICAL" | "AGREEMENT", file: File) {
  if (!auth.currentUser) {
    throw new Error("Upload blocked: User is not authenticated.");
  }

  // Rules sanity check logging
  // (logging removed)

  const safeName = sanitize(file.name);
  // Path: driver_documents/{driverId}/{docType}/{timestamp}_{originalName}
  const storagePath = `driver_documents/${driverId}/${docType}/${Date.now()}_${safeName}`;

  const storageRef = ref(storage, storagePath);
  
  // Using uploadBytesResumable as requested for better control
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<{ url: string, metadata: any }>((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        // You could track progress here if needed
      },
      (error) => {
        console.error("Upload failed:", error);
        // Better error handling
        if (error.code === 'storage/unauthorized') {
          console.error("Permission denied. Check Storage Rules or User Role.");
        }
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
             url,
             metadata: {
               docType,
               fileName: file.name,
               fullPath: storagePath,
               downloadURL: url,
               uploadedAt: new Date().toISOString(), // Use ISO string for array objects
               uploadedBy: auth.currentUser?.uid
             }
          });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

export async function createDriverWithDocs(driverData: any, dlFile?: File, medicalFile?: File) {
  if (!auth.currentUser) {
    throw new Error("Authentication required to create driver.");
  }

  console.log("Creating driver record...");
  
  // 1) Create driver first to get the ID
  const driverRef = await addDoc(collection(db, "drivers"), {
    ...driverData,
    createdAt: serverTimestamp(),
    createdBy: auth.currentUser.uid,
    truck: "Unassigned",
    documents: [], // Initialize empty documents array
    dlUploaded: false,
    medicalUploaded: false
  });

  const driverId = driverRef.id;
  console.log("Driver created with ID:", driverId);

  try {
    const newDocs = [];

    // 2) Upload docs if present
    if (dlFile) {
      console.log("Uploading DL...");
      const dlResult = await uploadDriverDoc(driverId, "DL", dlFile);
      newDocs.push(dlResult.metadata);
    }
    
    if (medicalFile) {
      console.log("Uploading Medical Card...");
      const medResult = await uploadDriverDoc(driverId, "MEDICAL", medicalFile);
      newDocs.push(medResult.metadata);
    }

    // 3) Update driver with document metadata
    if (newDocs.length > 0) {
      console.log("Updating driver with document metadata...");
      await updateDoc(doc(db, "drivers", driverId), {
        documents: arrayUnion(...newDocs),
        dlUploaded: !!dlFile,
        medicalUploaded: !!medicalFile,
        docsUpdatedAt: serverTimestamp(),
      });
    }

    console.log("Driver registration complete.");
    return driverId;
    
  } catch (error) {
    console.error("Error during document upload/update:", error);
    // Ideally, you might want to rollback (delete driver) here if upload fails, 
    // but for now we just throw so the UI shows the error.
    throw error;
  }
}

export async function updateDriverWithDocs(driverId: string, updates: any, dlFile?: File, medicalFile?: File) {
  if (!auth.currentUser) {
    throw new Error("Authentication required to update driver.");
  }

  console.log("Updating driver record:", driverId);
  const newDocs = [];

  try {
    // 1) Upload new docs if present
    if (dlFile) {
      console.log("Uploading New DL...");
      const dlResult = await uploadDriverDoc(driverId, "DL", dlFile);
      newDocs.push(dlResult.metadata);
    }

    if (medicalFile) {
      console.log("Uploading New Medical Card...");
      const medResult = await uploadDriverDoc(driverId, "MEDICAL", medicalFile);
      newDocs.push(medResult.metadata);
    }

    // 2) Prepare update object
    const updateData: any = {
      ...updates,
      lastUpdatedAt: serverTimestamp(),
      lastUpdatedBy: auth.currentUser.uid,
    };

    if (newDocs.length > 0) {
      updateData.documents = arrayUnion(...newDocs);
      if (dlFile) updateData.dlUploaded = true;
      if (medicalFile) updateData.medicalUploaded = true;
      updateData.docsUpdatedAt = serverTimestamp();
    }

    // 3) Update Firestore
    await updateDoc(doc(db, "drivers", driverId), updateData);
    console.log("Driver update complete.");
    return driverId;

  } catch (error) {
    console.error("Error during driver update:", error);
    throw error;
  }
}
