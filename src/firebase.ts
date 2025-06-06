import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCZJ1xRhr4jbhAe9Cg87otOsatTRVoJqGE",
  authDomain: "freport-test.firebaseapp.com",
  projectId: "freport-test",
  storageBucket: "freport-test.firebasestorage.app",
  messagingSenderId: "620724602040",
  appId: "1:620724602040:web:a670fca83b0e2e45f7204d",
  measurementId: "G-3ZDXSH3DNZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
