// Import the required Firebase modules
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvoTSXJrjLHRJM0Ol_wsHQM5nhAAcgA5Q",
  authDomain: "fir-looklab.firebaseapp.com",
  projectId: "fir-looklab",
  storageBucket: "fir-looklab.appspot.com",
  messagingSenderId: "384892821127",
  appId: "1:384892821127:web:02a0253039659e0e9d6222"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
