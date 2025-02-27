// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDKTXO3KHOqstAjOYRTpKTufGoLckxcy4",
  authDomain: "login-suti.firebaseapp.com",
  databaseURL: "https://login-suti-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "login-suti",
  storageBucket: "login-suti.firebasestorage.app",
  messagingSenderId: "363075617631",
  appId: "1:363075617631:web:4d3869e132026a4c0b6cea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };