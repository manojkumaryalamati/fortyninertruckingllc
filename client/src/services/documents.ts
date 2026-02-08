import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function createDriverDocRecord(params: {
  driverId: string;
  docType: "DL" | "MEDICAL";
  fileName: string;
  fileUrl: string;
  storagePath: string;
  contentType: string;
  size: number;
  expiry?: string; // optional
}) {
  const { driverId, docType, fileName, fileUrl, storagePath, contentType, size, expiry } = params;

  await addDoc(collection(db, "documents"), {
    ownerType: "driver",
    ownerId: driverId,
    documentType: docType === "DL" ? "DRIVING_LICENSE" : "MEDICAL_CARD",
    fileName,
    fileUrl,
    storagePath,
    contentType,
    size,
    expiry: expiry ?? null,
    createdAt: serverTimestamp(),
    status: "Active",
  });
}
