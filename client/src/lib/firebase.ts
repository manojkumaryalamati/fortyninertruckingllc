import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration provided by user
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

// Helper to check if Firebase is configured
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "YOUR_API_KEY" && 
         firebaseConfig.apiKey !== undefined &&
         firebaseConfig.apiKey !== "";
};
