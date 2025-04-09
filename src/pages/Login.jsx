// src/pages/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importa el archivo de estilos CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Verifica si el correo del usuario es el del admin
      if (user.email === 'admin@example.com') {
        navigate('/admin'); // Redirige al panel de admin
      } else {
        navigate('/'); // Redirige al home o al dashboard para usuarios comunes
      }
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  const navigateToCreateUser = () => {
    navigate('/crear-usuario'); // Redirige a la página de creación de usuario
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo aquí */}
        <img src="/path-to-your-logo.png" alt="Logo" className="logo" />

        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        <button className="create-account-btn" onClick={navigateToCreateUser}>
          ¿No tienes cuenta? Crear cuenta
        </button>
      </div>
    </div>
  );
};

export default Login;
