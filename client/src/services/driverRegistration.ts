import { addDoc, collection, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { uploadDriverDocument } from "./upload";
import { createDriverDocRecord } from "./documents";

export async function createDriverWithDl(params: {
  name: string;
  email: string;
  phone: string;
  license: string;
  status: string;
  joinDate?: string;
  dlFile?: File;           // from upload input
  docType?: "DL" | "MEDICAL";
}) {
  const { dlFile, docType = "DL", ...driverData } = params;

  // 1) Create driver record first
  const driverRef = await addDoc(collection(db, "drivers"), {
    ...driverData,
    truck: "Unassigned",
    createdAt: serverTimestamp(),
  });

  const driverId = driverRef.id;

  // 2) If file was selected, upload it + create document metadata
  if (dlFile) {
    const uploaded = await uploadDriverDocument({
      driverId,
      docType,
      file: dlFile,
    });

    await createDriverDocRecord({
      driverId,
      docType,
      fileName: uploaded.fileName,
      fileUrl: uploaded.url,
      storagePath: uploaded.path,
      contentType: uploaded.contentType,
      size: uploaded.size,
    });

    // 3) Optional: mark driver has DL
    await updateDoc(doc(db, "drivers", driverId), {
      dlUploaded: true,
      dlUpdatedAt: serverTimestamp(),
    });
  }

  return driverId;
}
