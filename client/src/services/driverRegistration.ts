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
  console.log("--- Rules Sanity Check ---");
  console.log("Uploading as UID:", auth.currentUser.uid);
  console.log("Target Path:", `driver_documents/${driverId}/${docType}/...`);
  try {
    const token = await auth.currentUser.getIdTokenResult();
    console.log("Admin Claim:", token.claims.admin);
    console.log("Full Token Claims:", token.claims);
  } catch (e) {
    console.warn("Could not fetch token claims for debug logging");
  }
  console.log("--------------------------");

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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
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
