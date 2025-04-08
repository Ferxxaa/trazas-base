import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDj1kKbfBv0uhI_m2l8Zkpfon04nhr7Pto",
  authDomain: "autenticacion-d519a.firebaseapp.com",
  projectId: "autenticacion-d519a",
  storageBucket: "autenticacion-d519a.firebasestorage.app",
  messagingSenderId: "348526062658",
  appId: "1:348526062658:web:03eddbbee3d54b9e1391db",
  measurementId: "G-HB62ZVL1Q9"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Solo se declara una vez
const db = getDatabase(app);

// Exportación para que puedas usar auth y db en otros archivos
export { auth, db };