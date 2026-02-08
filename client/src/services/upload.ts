import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";

export async function uploadDriverDocument(params: {
  driverId: string;
  docType: "DL" | "MEDICAL";
  file: File;
}) {
  const { driverId, docType, file } = params;

  // Good filename pattern to avoid collisions
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `driver_documents/${driverId}/${docType}/${Date.now()}_${safeName}`;

  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return { url, path, fileName: file.name, contentType: file.type, size: file.size };
}
