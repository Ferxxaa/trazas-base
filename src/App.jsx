// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foro from './pages/Foro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/foro" element={<Foro />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App; // Asegúrate de tener esta línea
