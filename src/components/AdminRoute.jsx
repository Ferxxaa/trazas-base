// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element, user }) => {
  // Verifica si el usuario está autenticado y tiene el rol de administrador
  if (!user || user.email !== 'admin@example.com') {
    return <Navigate to="/login" />;
  }

  return element;  // Devuelve el componente si el usuario es admin
};

export default AdminRoute;
