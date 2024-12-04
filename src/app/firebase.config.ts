// Import necessary Firebase modules
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore/lite";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBedWTSjkMDR9Xlc1wP8A5U1f88du_CILE",
  authDomain: "christmas-c6610.firebaseapp.com",
  projectId: "christmas-c6610",
  storageBucket: "christmas-c6610.appspot.com",
  messagingSenderId: "473969574069",
  appId: "1:473969574069:web:abd9b5a2673aa20c2cbefc",
  measurementId: "G-0S3YEM15PR",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore and specify the type
const db: Firestore = getFirestore(app);

export default db;
