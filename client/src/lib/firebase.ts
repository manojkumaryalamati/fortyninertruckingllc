import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Hardcoded Firebase configuration for immediate stability in prototype.
 * NOTE: For production, these should be moved to environment variables.
 */
const firebaseConfig = {
  apiKey: "AIzaSyBPf09YcCVNU7hIza3i1Ylw-gDrGfQsafE",
  authDomain: "fortyninertruckingllc.firebaseapp.com",
  projectId: "fortyninertruckingllc",
  storageBucket: "fortyninertruckingllc.firebasestorage.app",
  messagingSenderId: "131233292817",
  appId: "1:131233292817:web:9ae8616d76a1a0580b07b0",
  measurementId: "G-LLP5KP62RD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Helper to check if Firebase is properly configured.
 */
export const isFirebaseConfigured = () => {
  return !!firebaseConfig.apiKey && 
         firebaseConfig.apiKey !== "YOUR_API_KEY";
};
