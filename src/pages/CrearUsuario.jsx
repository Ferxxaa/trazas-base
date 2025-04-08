// src/pages/CrearUsuario.jsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { initializeApp, getApps } from 'firebase/app';

const CrearUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [rut, setRut] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Configuración de Firebase
  const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id",
  };

  // Inicializar Firebase solo si no está inicializado
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const auth = getAuth(app);
  const db = getDatabase(app);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear el usuario con correo y contraseña predeterminada
      const userCredential = await createUserWithEmailAndPassword(auth, correo, 'contraseña123');
      const user = userCredential.user;
      const userId = user.uid;

      // Guardar el usuario en la base de datos
      await set(ref(db, 'usuarios/' + userId), {
        nombre,
        apellido,
        correo,
        rut,
      });

      // Si el usuario es administrador, guardarlo en la sección admin
      if (isAdmin) {
        await set(ref(db, 'admin/' + userId), true);
      }

      alert('Usuario creado correctamente');
      navigate('/login'); // Redirigir al login después de crear el usuario
    } catch (error) {
      console.error("Error al crear el usuario:", error.message);
      alert("Hubo un error al crear el usuario.");
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>RUT:</label>
          <input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
        </div>
        <div>
          <label>¿Es Administrador?</label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
        </div>
        <div>
          <button type="submit">Crear Usuario</button>
        </div>
      </form>
    </div>
  );
};

export default CrearUsuario;
