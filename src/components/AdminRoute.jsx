// components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element, user }) => {
  // UID del administrador
  const adminUID = 'SU2vSS0W0KaxRcdWe8OtaRYg0Jv2';

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.uid !== adminUID) {
    return <Navigate to="/" />;
  }

  return element;
};

export default AdminRoute;
