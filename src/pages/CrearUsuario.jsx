import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../firebase';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la navegación
import './Login.css'; // Importa el archivo CSS

const CrearUsuario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rut, setRut] = useState('');
  const navigate = useNavigate(); // Obtiene la función de navegación

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = ref(database, 'usuarios/' + user.uid);
      await set(userRef, {
        nombre: firstName,
        apellido: lastName,
        rut: rut,
      });

      alert('Usuario creado con éxito');
    } catch (error) {
      console.error('Error al registrar usuario: ', error);
      alert('Hubo un error al crear la cuenta');
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Retrocede a la página anterior
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
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrar</button>
        </form>

        <button onClick={handleGoBack} className="go-back-btn">Volver</button> {/* Botón de retroceso */}
      </div>
    </div>
  );
};

export default CrearUsuario;
