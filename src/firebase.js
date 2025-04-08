import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDj1kKbfBv0uhI_m2l8Zkpfon04nhr7Pto",
  authDomain: "autenticacion-d519a.firebaseapp.com",
  projectId: "autenticacion-d519a",
  storageBucket: "autenticacion-d519a.firebasestorage.app",
  messagingSenderId: "348526062658",
  appId: "1:348526062658:web:03eddbbee3d54b9e1391db",
  measurementId: "G-HB62ZVL1Q9"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };