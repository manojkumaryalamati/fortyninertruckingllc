import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPf09YcCVNU7hIza3i1Ylw-gDrGfQsafE",
  authDomain: "fortyninertruckingllc.firebaseapp.com",
  projectId: "fortyninertruckingllc",
  storageBucket: "fortyninertruckingllc.firebasestorage.app",
  messagingSenderId: "131233292817",
  appId: "1:131233292817:web:9ae8616d76a1a0580b07b0",
  measurementId: "G-LLP5KP62RD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const isFirebaseConfigured = () => {
  return !!import.meta.env.VITE_FIREBASE_API_KEY;
};
