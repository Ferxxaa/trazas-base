import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import Multimedia from './pages/Multimedia';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import CrearUsuario from './pages/CrearUsuario';
import ForoTrabajadores from './pages/ForoTrabajadores'; 
import AdminDashboard from './pages/AdminDashboard'; 
import AdminRoute from './components/AdminRoute'; 
import { auth } from './firebase'; // Asegúrate de importar la autenticación de Firebase
import ComitePage from './pages/ComitePage';
import RecursosHumanosPage from './pages/RecursosHumanosPage';
import HechosRelevantesPage from './pages/HechosRelevantesPage';
import PoliticaPage from './pages/PoliticaPage';
import ObjetivosPage from './pages/ObjetivosPage';
import RolesYResponsabilidadesPage from './pages/RolesYResponsabilidadesPage';
import ReglamentoPage from './pages/ReglamentoPage';

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
       
        <Route path="/multimedia" element={<><Navbar /><Multimedia /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear-usuario" element={<CrearUsuario />} />
        <Route path="/foro-trabajadores" element={<ForoTrabajadores />} />
        <Route
          path="/admin"
          element={<AdminRoute element={<AdminDashboard />} user={user} />}
        />
        <Route path="/comite" element={<ComitePage />} />
        <Route path="/recursos-humanos" element={<RecursosHumanosPage />} />
        <Route path="/hechos-relevantes" element={<HechosRelevantesPage />} />
        <Route path="/politica" element={<PoliticaPage />} />
        <Route path="/objetivos" element={<ObjetivosPage />} />
        <Route path="/roles-y-responsabilidades" element={<RolesYResponsabilidadesPage />} />  {/* Ruta para RolesYResponsabilidadesPage */}
        <Route path="/reglamento" element={<ReglamentoPage />} />  {/* Ruta para ReglamentoPage */}
      </Routes>
    </Router>
  );
};

export default App;
