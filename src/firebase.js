import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyC5nM9sk1VRyLSLIxPnIiJyetIPivfS764",
  authDomain: "lewis-3ba3f.firebaseapp.com",
  projectId: "lewis-3ba3f",
  storageBucket: "lewis-3ba3f.firebasestorage.app",
  messagingSenderId: "53498598876",
  appId: "1:53498598876:web:d8daa59a2100cdc75d6b19",
  measurementId: "G-F4PZ30CQMV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
