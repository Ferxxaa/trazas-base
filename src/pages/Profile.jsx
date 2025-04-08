import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { auth, database } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Obtener los datos del usuario desde la Realtime Database
        const userRef = ref(database, 'usuarios/' + currentUser.uid);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setName(userData.nombre || ''); // Cargar el nombre
          setLastName(userData.apellido || ''); // Cargar el apellido
          setRut(userData.rut || ''); // Cargar el RUT
          setPhone(userData.telefono || ''); // Cargar el teléfono
          setEmail(user.email); // Correo ya está en el objeto user
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (user) {
      try {
        // Actualizar los datos del usuario en la Realtime Database
        const userRef = ref(database, 'usuarios/' + user.uid);
        await set(userRef, {
          nombre: name,
          apellido: lastName,
          rut: rut,
          telefono: phone,
          email: email,
        });

        alert('Perfil actualizado con éxito');
      } catch (error) {
        console.error('Error al actualizar perfil: ', error);
        alert('Hubo un error al actualizar tu perfil');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Perfil de Usuario</h1>
      {user ? (
        <div>
          <div>
            <p><strong>Correo:</strong> {email}</p>
            <p><strong>Nombre:</strong> {name}</p>
            <p><strong>Apellido:</strong> {lastName}</p>
            <p><strong>RUT:</strong> {rut}</p>
            <p><strong>Teléfono:</strong> {phone}</p>
          </div>
          <form onSubmit={handleUpdateProfile}>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="RUT"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">Actualizar Perfil</button>
          </form>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Profile;
