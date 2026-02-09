import { addDoc, collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../lib/firebase";

async function uploadDriverDoc(driverId: string, docType: "DL" | "MEDICAL", file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `driver_documents/${driverId}/${docType}/${Date.now()}_${safeName}`;

  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "documents"), {
    ownerType: "driver",
    ownerId: driverId,
    documentType: docType === "DL" ? "DRIVING_LICENSE" : "MEDICAL_CARD",
    fileName: file.name,
    fileUrl: url,
    storagePath,
    createdAt: serverTimestamp(),
    status: "Active",
  });

  return { url, storagePath };
}

export async function createDriverWithDocs(driverData: any, dlFile?: File, medicalFile?: File) {
  // 1) Create driver first
  const driverRef = await addDoc(collection(db, "drivers"), {
    ...driverData,
    createdAt: serverTimestamp(),
    truck: "Unassigned",
    pendingDocs: true,
  });

  const driverId = driverRef.id;

  // 2) Upload docs
  if (dlFile) await uploadDriverDoc(driverId, "DL", dlFile);
  if (medicalFile) await uploadDriverDoc(driverId, "MEDICAL", medicalFile);

  // 3) Update driver flags
  await updateDoc(doc(db, "drivers", driverId), {
    pendingDocs: false,
    dlUploaded: !!dlFile,
    medicalUploaded: !!medicalFile,
    docsUpdatedAt: serverTimestamp(),
  });

  return driverId;
}
