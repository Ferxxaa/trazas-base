// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();  // Cleanup the listener on unmount
  }, [navigate]);

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h1>Bienvenido a la página principal</h1>
        <p>¡Aquí puedes ver el contenido después de iniciar sesión!</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '60px',
    padding: '20px',
    textAlign: 'center',
  },
  content: {
    marginTop: '20px',
  },
};

export default Home;
