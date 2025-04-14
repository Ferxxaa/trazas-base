import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ComitePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div
        style={{
          paddingTop: '90px',
          backgroundImage: 'url(/images/marmol3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Container className="py-5">

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
                onClick={() => navigate('/politica')} // Regresar a Reglamento
              >
                📜 Política de Seguridad
              </Button>
            </Col>
            <Col md={3} className="mb-3">
              <Button
                variant="info"
                size="sm" // Botón más pequeño
                block
                onClick={() => navigate('/objetivos')} // Volver a Recursos Humanos
              >
                🎯 Objetivos
              </Button>
            </Col>
          </Row>

          {/* Título */}
          <h1 className="text-center mb-5" style={{ color: '#c62828' }}>
            Comité de Consulta y Participación
          </h1>

          {/* Sección Comité */}
          {/* Sección Comité */}
<section id="comite">
  <Row className="justify-content-center mb-5">
    {/* Card para las imágenes */}
    <Col md={6} className="mb-4">
      <Card className="mb-4">
        <Card.Body>
          <Row className="justify-content-center">
            {[
              { nombre: 'Randall Ortega', img: '/images/Randall.png' },
              { nombre: 'Luis Puente', img: '/images/Puente.png' },
              { nombre: 'Nelson Muñoz', img: '/images/Nelson.png' },
            ].map((persona, index) => (
              <Col key={index} xs={6} md={4} className="text-center mb-4">
                <Image
                  src={persona.img}
                  roundedCircle
                  fluid
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    border: '3px solid #c62828',
                  }}
                />
                <p className="mt-2 fw-bold">{persona.nombre}</p>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Col>

    {/* Card para el texto */}
    <Col md={6}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="text-center" style={{ color: '#c62828' }}></Card.Title>
          <p className="fs-5 text-justify">
            “Es un grupo de trabajadores presididos por el Representante, los cuales canalizan opiniones y promueven la participación, en un proceso previo, anterior a la toma de decisiones, referente a políticas y situaciones relevantes en Matriz de Seguridad y Salud Ocupacional”.
          </p>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</section>


          {/* Imagen inferior */}
          <Row className="justify-content-center mt-5">
            <Col md={8} className="text-center">
              <Image
                src="/images/comite.png"
                fluid
                rounded
                style={{
                  border: '2px solid #c62828',
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ComitePage;
