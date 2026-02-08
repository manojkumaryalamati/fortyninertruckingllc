import { storage, isFirebaseConfigured } from "./firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param file The file object to upload
 * @param path The storage path (folder structure)
 * @returns Promise resolving to the download URL
 */
export const uploadFile = async (file: File, path: string): Promise<string> => {
  if (!isFirebaseConfigured()) {
    console.log("Mock upload:", file.name);
    return `https://fake-url.com/${file.name}`;
  }

  // Create a reference to 'path/filename'
  // We append a timestamp to filename to avoid collisions
  const fileName = `${Date.now()}_${file.name}`;
  const fullPath = `${path}/${fileName}`;
  const storageRef = ref(storage, fullPath);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Deletes a file from Firebase Storage.
 * @param url The download URL of the file
 */
export const deleteFile = async (url: string) => {
  if (!isFirebaseConfigured() || url.includes("fake-url")) {
    console.log("Mock delete:", url);
    return;
  }

  try {
    // Extract path from URL or just use the refFromURL if supported (SDK specific)
    // For simplicity in v9 modular, we often store the storage path separately, 
    // but here we can try to create a ref from the URL.
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    // Suppress error if object not found
  }
};
