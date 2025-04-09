import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert('Has cerrado sesión');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión', error);
      });
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#c62828' }} variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: '#f5f5f5' }}>
          <strong>Trazas</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={{ color: '#f5f5f5' }}>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/profile" style={{ color: '#f5f5f5' }}>Perfil</Nav.Link>
            <Nav.Link as={Link} to="/multimedia" style={{ color: '#f5f5f5' }}>Multimedia</Nav.Link>
            <Nav.Link as={Link} to="/foro-trabajadores" style={{ color: '#f5f5f5' }}>Foro de Trabajadores</Nav.Link>
            
            <Nav.Link as={Link} to="/admin" style={{ color: '#f5f5f5' }}>Panel de Admin</Nav.Link>
            
            
            
            {/* Agregar más enlaces según sea necesario */}
            {/* Botón de cerrar sesión */}  
            
            <Button
              variant="light"
              onClick={handleLogout}
              className="ms-2"
              style={{
                backgroundColor: '#424242',
                color: '#fff',
                border: 'none'
              }}
            >
              Cerrar sesión
            </Button>  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
