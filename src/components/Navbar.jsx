// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      alert('Has cerrado sesión');
    }).catch((error) => {
      console.error('Error al cerrar sesión', error);
    });
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Inicio</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/profile" style={styles.navLink}>Perfil</Link>
        </li>
        <li style={styles.navItem}>
          <button onClick={handleLogout} style={styles.logoutButton}>Cerrar sesión</button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#007BFF',
    padding: '10px 20px',
    position: 'fixed',
    width: '100%',
    top: '0',
    zIndex: 1000,
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '20px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  logoutButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Navbar;
