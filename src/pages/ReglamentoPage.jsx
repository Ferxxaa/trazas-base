// src/pages/ReglamentoPage.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const ReglamentoPage = () => {
  const navigate = useNavigate(); // Crear instancia de navigate

  return (
    <div>
      <Navbar />

      <div
        style={{
          paddingTop: '120px',
          backgroundImage: 'url(/images/marmol3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        {/* Botones de navegación arriba */}
        <Row className="justify-content-center mt-3">
          <Col md={3} className="mb-3">
            <Button
              variant="secondary"
              size="sm" // Botón más pequeño
              block
              onClick={() => navigate('/')} // Regresar al inicio
            >
              🏠 Regresar al Inicio
            </Button>
          </Col>
          <Col md={3} className="mb-3">
            <Button
              variant="danger"
              size="sm" // Botón más pequeño
              block
              onClick={() => navigate('/recursos-humanos')} // Regresar a Recursos Humanos
            >
              👥 Volver a Recursos Humanos
            </Button>
          </Col>
          <Col md={3} className="mb-3">
            <Button
              variant="info"
              size="sm" // Botón más pequeño
              block
              onClick={() => navigate('/roles-y-responsabilidades')} // Volver a Roles y Responsabilidades
            >
              📋 Roles y Responsabilidades
            </Button>
          </Col>
        </Row>

        <Container className="py-5 text-center">
          <h1 style={{ color: '#e60000', fontSize: '2.5rem', fontWeight: 'bold' }}>Descargar Documentos del Reglamento</h1>
          <p>Puedes descargar los siguientes documentos reglamentarios:</p>

          <Row className="justify-content-center mt-4">
            <Col md={4} className="mb-3">
              <a href="/docs/reglamento_interno.pdf" download>
                <Button variant="danger" size="lg" block>
                  📄 Descargar Reglamento Interno
                </Button>
              </a>
            </Col>
            <Col md={4} className="mb-3">
              <a href="/docs/manual_convivencia.pdf" download>
                <Button variant="dark" size="lg" block>
                  📘 Descargar SubContrato
                </Button>
              </a>
            </Col>
          </Row>

          
          
        </Container>
      </div>
    </div>
  );
};

export default ReglamentoPage;
