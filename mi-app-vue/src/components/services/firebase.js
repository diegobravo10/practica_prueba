// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9Ed1Kke-DpjCvSA1nGHVtiXujqtZ2A4c",
  authDomain: "prueba-practica-8f8d3.firebaseapp.com",
  projectId: "prueba-practica-8f8d3",
  storageBucket: "prueba-practica-8f8d3.firebasestorage.app",
  messagingSenderId: "424294290202",
  appId: "1:424294290202:web:e8c155b45e96aeb68652a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);