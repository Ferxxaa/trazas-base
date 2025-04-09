import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth } from '../firebase';
import { db } from '../firebase';
import './Login.css'; // Importa el archivo CSS

const CrearUsuario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rut, setRut] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificar que los campos obligatorios estén completos (excluyendo el correo)
    if (!password || !firstName || !lastName || !rut) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    try {
      let userCredential;

      // Si el correo está proporcionado, intentamos registrar con correo y contraseña
      if (email) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Si el correo no está proporcionado, usamos solo la contraseña (esto es poco común, pero aquí lo dejamos para tu caso)
        userCredential = await createUserWithEmailAndPassword(auth, 'default@domain.com', password); // Correo predeterminado
      }

      const user = userCredential.user;

      // Referencia a la base de datos para guardar los detalles del usuario
      const userRef = ref(db, 'usuarios/' + user.uid);
      await set(userRef, {
        nombre: firstName,
        apellido: lastName,
        rut: rut,
        correo: email || null, // Guardamos el correo solo si está presente
      });

      alert('Usuario creado con éxito');
    } catch (error) {
      console.error('Error al registrar usuario: ', error);
      alert('Hubo un error al crear la cuenta');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Crear Usuario</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="RUT"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Correo (Opcional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;
