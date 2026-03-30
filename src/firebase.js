import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEUiqBvcCfQgYPra7bV9cd6OvFbxySjXc",
  authDomain: "edvins-todo.firebaseapp.com",
  projectId: "edvins-todo",
  storageBucket: "edvins-todo.firebasestorage.app",
  messagingSenderId: "878461291241",
  appId: "1:878461291241:web:51fb4741ed12241310fe78",
  measurementId: "G-LL842SVVCR"
};

export const db = getFirestore(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);