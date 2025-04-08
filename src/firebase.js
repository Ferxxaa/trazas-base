import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDj1kKbfBv0uhI_m2l8Zkpfon04nhr7Pto",
  authDomain: "autenticacion-d519a.firebaseapp.com",
  projectId: "autenticacion-d519a",
  storageBucket: "autenticacion-d519a.firebasestorage.app",
  messagingSenderId: "348526062658",
  appId: "1:348526062658:web:03eddbbee3d54b9e1391db",
  measurementId: "G-HB62ZVL1Q9"
};

const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Authentication
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, getDocs, addDoc, deleteDoc, doc, updateDoc };