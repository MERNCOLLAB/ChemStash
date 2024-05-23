// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-3e758.firebaseapp.com",
  projectId: "mern-auth-3e758",
  storageBucket: "mern-auth-3e758.appspot.com",
  messagingSenderId: "48522214916",
  appId: "1:48522214916:web:530af16d9c0b3f50907f51"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);