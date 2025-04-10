// src/pages/ReglamentoPage.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const ReglamentoPage = () => {
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
