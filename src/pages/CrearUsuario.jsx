import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth } from '../firebase';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom'; // <-- Importa useNavigate
import './Login.css'; // Importa el archivo CSS

const CrearUsuario = () => {
  const navigate = useNavigate(); // <-- Inicializa el hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rut, setRut] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!password || !firstName || !lastName || !rut) {
      setErrorMessage('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('El correo electrónico no es válido.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      let userCredential;

      if (email) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, 'default@domain.com', password);
      }

      const user = userCredential.user;

      const userRef = ref(db, 'usuarios/' + user.uid);
      await set(userRef, {
        nombre: firstName,
        apellido: lastName,
        rut: rut,
        correo: email || null,
      });

      alert('Usuario creado con éxito');
      setErrorMessage('');
      navigate('/dashboard'); // <-- Redirigir al Dashboard después de crear el usuario
    } catch (error) {
      console.error('Error al registrar usuario: ', error);

      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('El correo electrónico ya está en uso.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('El correo electrónico es inválido.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      } else {
        setErrorMessage('Hubo un error al crear la cuenta. Intenta de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Botón de flecha para volver */}
        <button
          className="back-button"
          onClick={() => navigate('/admin')}
          style={{
            background: 'none',
            border: 'none',
            color: '#C62B27',
            fontSize: '20px',
            cursor: 'pointer',
            marginBottom: '10px',
            alignSelf: 'flex-start'
          }}
        >
          ← Volver
        </button>

        <h2>Crear Usuario</h2>
        <form onSubmit={handleRegister}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
