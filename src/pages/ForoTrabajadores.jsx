import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { db, auth } from '../firebase'; // Asegúrate de tener bien configurado Firebase
import { doc, getDoc } from 'firebase/firestore'; // Importar las funciones de Firestore

const ForoTrabajadores = () => {
  const [role, setRole] = useState(null); // Estado para el rol del usuario
  const [loading, setLoading] = useState(true); // Estado de carga para esperar la consulta

  // Función para obtener el rol del usuario desde Firestore
  const getUserRole = async () => {
    if (!auth.currentUser) {
      return;
    }

    try {
      // Consulta el documento del usuario usando el UID (id único)
      const userDoc = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));
      if (userDoc.exists()) {
        setRole(userDoc.data().role); // Establece el rol en el estado
      }
    } catch (error) {
      console.error("Error obteniendo rol de usuario: ", error);
    } finally {
      setLoading(false); // Cambia el estado de carga cuando termine
    }
  };

  // Ejecutar la función para obtener el rol cuando el componente se monta
  useEffect(() => {
    getUserRole();
  }, []);

  // Mientras cargamos el rol, mostramos un mensaje de carga
  if (loading) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  // Si el rol no es admin, redirigimos al usuario
  if (role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Si el usuario es admin, mostramos el contenido del foro
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Foro de Trabajadores
      </Typography>
      {/* Contenido del foro */}
    </Container>
  );
};

export default ForoTrabajadores;
