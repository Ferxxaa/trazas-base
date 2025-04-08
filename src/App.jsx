// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Multimedia from './pages/Multimedia';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import CrearUsuario from './pages/CrearUsuario';
import theme from './theme';
import ForoTrabajadores from './pages/ForoTrabajadores';




const App = () => {
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
      </Routes>
    </Router>
  );
};

export default App;
