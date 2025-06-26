// src/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import config from "./firebaseConfig"; // Correct relative import

// Initialize Firebase
const app = initializeApp(config);

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in client-side
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics };