// src/pages/RecursosHumanosPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';  // Asegúrate de que la ruta sea correcta
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const RecursosHumanosPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Agregar el Navbar aquí */}
      <Navbar />

      {/* Fondo de imagen */}
      <div
        style={{
          paddingTop: '120px',  // Aumentar el espacio superior para evitar que el contenido toque el navbar
          backgroundImage: 'url(/images/marmol3.jpg)',  // Ruta de la imagen de fondo
          backgroundSize: 'cover',  // Hace que la imagen cubra toda la pantalla
          backgroundPosition: 'center',  // Centra la imagen
          minHeight: '100vh',  // Asegura que el fondo cubra toda la altura de la pantalla
        }}
      >
        {/* Botones para roles y reglamento */}
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Button
              variant="danger"
              size="lg"
              className="m-3"
              onClick={() => navigate('/roles-y-responsabilidades')}
            >
              Roles y Responsabilidades
            </Button>
            <Button
              variant="danger"
              size="lg"
              className="m-3"
              onClick={() => navigate('/reglamento')}
            >
              Reglamento
            </Button>
          </Col>
        </Row>

        <Container className="py-5">
          {/* Título principal */}
          <Row className="justify-content-center mb-4">
            <Col md={12} className="text-center">
              <h1 style={{ color: '#e60000', fontSize: '2.5rem', fontWeight: 'bold' }}>Recursos Humanos</h1>
            </Col>
          </Row>

          {/* Sección de trabajador con imagen, nombre y contacto */}
          <Row className="justify-content-center">
            <Col md={6} className="text-center mb-4">
              <Card className="shadow-lg" style={{ backgroundColor: '#ffffff', border: '1px solid #d7a77e' }}>
                <Card.Img
                  variant="top"
                  src="/images/Nelson.png" // Imagen del trabajador
                  style={{ maxHeight: '450px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title style={{ color: '#e60000' }}>Nelson Muñoz</Card.Title>
                  <Card.Text>
                    <strong>Contacto:</strong> nmunoz@trazas.cl
                    <br />
                    <strong>Teléfono:</strong> 6194 5892
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Información adicional */}
          <Row className="justify-content-center">
            <Col md={12} className="text-center">
              <p>Página de contacto con el equipo de Recursos Humanos.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RecursosHumanosPage;
