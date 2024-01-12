// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vom-real-estate.firebaseapp.com",
  projectId: "vom-real-estate",
  storageBucket: "vom-real-estate.appspot.com",
  messagingSenderId: "1038469617120",
  appId: "1:1038469617120:web:b1c2cfcb79db342cb30785"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);