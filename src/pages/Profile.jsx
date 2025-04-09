import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../firebase';
import { db } from '../firebase';  // Asegúrate de importar db
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import './Profile.css';  // Importa el CSS para el componente
import { Box } from '@mui/material';  // Asegúrate de importar Box

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = ref(db, 'usuarios/' + currentUser.uid);  // Cambié database por db
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setName(userData.nombre || '');
          setLastName(userData.apellido || '');
          setRut(userData.rut || '');
          setPhone(userData.telefono || '');
          setEmail(currentUser.email || ''); // Agregar un valor predeterminado en caso de que `currentUser.email` sea `null`
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
        const userRef = ref(db, 'usuarios/' + user.uid);  // Cambié database por db
        await set(userRef, {
          nombre: name,
          apellido: lastName,
          rut: rut,
          telefono: phone,
          email: email, // Mantener email como parte de la actualización
        });
        alert('Perfil actualizado con éxito');
      } catch (error) {
        console.error('Error al actualizar perfil: ', error);
        alert('Hubo un error al actualizar tu perfil');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  return (
    <Box pt={10}>  {/* Añadido Box con padding-top */}
      <div className="profile-container">
        <div className="profile-card">
          <h2>Perfil de Usuario</h2>
          {user ? (
            <div>
              <img 
                src={photo ? URL.createObjectURL(photo) : 'https://via.placeholder.com/300x200'} 
                alt="Foto de perfil" 
              />
              <form onSubmit={handleUpdateProfile}>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  placeholder="RUT"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                />
                {isEditing ? (
                  <button type="submit">Guardar Cambios</button>
                ) : (
                  <button type="button" onClick={() => setIsEditing(true)}>Editar Perfil</button>
                )}
              </form>
              <input type="file" onChange={handleFileChange} />
              <button className="upload-button" onClick={handleUpdateProfile}>Subir Foto de Perfil</button>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Profile;
