import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Multimedia from './pages/Multimedia';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import CrearUsuario from './pages/CrearUsuario';
import ForoTrabajadores from './pages/ForoTrabajadores'; 
import AdminDashboard from './pages/AdminDashboard'; 
import AdminRoute from './components/AdminRoute'; 
import { auth } from './firebase'; // Asegúrate de importar la autenticación de Firebase

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* El Navbar solo se muestra en rutas que no sean Login */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /></>} />
        <Route path="/multimedia" element={<><Navbar /><Multimedia /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear-usuario" element={<CrearUsuario />} />
        <Route path="/foro-trabajadores" element={<ForoTrabajadores />} />
        <Route
          path="/admin"
          element={<AdminRoute element={<AdminDashboard />} user={user} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
