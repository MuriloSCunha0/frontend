// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtgHywZHk0CZipzX92unpVUvfx5j9S5q0",
  authDomain: "tenis-arena-3f90b.firebaseapp.com",
  projectId: "tenis-arena-3f90b",
  storageBucket: "tenis-arena-3f90b.appspot.com",
  messagingSenderId: "288256775507",
  appId: "1:288256775507:web:9a3a470ea624fdfb147da6",
  measurementId: "G-70M6T1HL02"
};

// Initialize Firebase

initializeApp(firebaseConfig);

const auth = auth();
const firestore = firestore();
const storage = storage();

export { auth, firestore, storage };