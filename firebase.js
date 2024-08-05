// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore' ;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtsXWJbkiCpxPkmtey9n-NnXj0SA7I_cI",
  authDomain: "inventory-management-c8c0d.firebaseapp.com",
  projectId: "inventory-management-c8c0d",
  storageBucket: "inventory-management-c8c0d.appspot.com",
  messagingSenderId: "930733392343",
  appId: "1:930733392343:web:7f17ca29d0ac3cd4804b92",
  measurementId: "G-DWMGQG6CD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};