
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrdq99eFhPHEYC7wuj1kLziyGIYBBJcJk",
  authDomain: "crm-database-17bc9.firebaseapp.com",
  projectId: "crm-database-17bc9",
  storageBucket: "crm-database-17bc9.firebasestorage.app",
  messagingSenderId: "659568225266",
  appId: "1:659568225266:web:61fd84c146a3d62bed996b",
  measurementId: "G-28V373FSRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const database = getFirestore(app);

if (process.env.NODE_ENV === 'development'){
  connectFunctionsEmulator(getFunctions(app), "localhost", 5001);
}
