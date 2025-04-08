// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Multimedia from './pages/Multimedia';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* El Navbar solo se muestra en rutas que no sean Login */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /></>} />
        <Route path="/multimedia" element={<><Navbar /><Multimedia /></>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
