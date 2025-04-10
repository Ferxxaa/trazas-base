import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Importando Link de react-router-dom
import Navbar from '../components/Navbar';  // Asegurando que el Navbar se muestre

const ComitePage = () => {
  return (
    <>
      <Navbar /> {/* Asegurando que el Navbar se muestre */}

      <div style={{ paddingTop: '90px' }}> {/* Para evitar que el navbar tape el contenido */}
        <Container className="py-5">
          <h1 className="text-center mb-5" style={{ color: '#c62828' }}>
            Comité de Consulta y Participación
          </h1>

          {/* Botones para navegar a diferentes páginas */}
          <div className="text-center mb-5">
            <Link to="/politica">
              <Button
                variant="danger"
                size="lg"
                className="mx-3 mb-3 mb-sm-0"
                style={{
                  backgroundColor: '#c62828',
                  border: '2px solid #c62828',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '15px 30px',
                  transition: 'background-color 0.3s, border-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e57373';
                  e.target.style.borderColor = '#e57373';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#c62828';
                  e.target.style.borderColor = '#c62828';
                }}
              >
                Política de Seguridad
              </Button>
            </Link>
            <Link to="/objetivos">
              <Button
                variant="danger"
                size="lg"
                className="mx-3 mb-3 mb-sm-0"
                style={{
                  backgroundColor: '#c62828',
                  border: '2px solid #c62828',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '15px 30px',
                  transition: 'background-color 0.3s, border-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e57373';
                  e.target.style.borderColor = '#e57373';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#c62828';
                  e.target.style.borderColor = '#c62828';
                }}
              >
                Objetivos
              </Button>
            </Link>
          </div>

          {/* Sección Comité */}
          <section id="comite">
            <Card className="mb-5">
              <Card.Body>
                <Card.Title className="text-center" style={{ color: '#c62828' }}>Comité de Consulta y Participación</Card.Title>
                <Row className="justify-content-center mb-5">
                  {[{ nombre: 'Randall Ortega', img: '/images/Randall.png' },
                    { nombre: 'Luis Puente', img: '/images/Puente.png' },
                    { nombre: 'Nelson Muñoz', img: '/images/Nelson.png' }
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
                          border: '3px solid #c62828'
                        }}
                      />
                      <p className="mt-2 fw-bold">{persona.nombre}</p>
                    </Col>
                  ))}
                </Row>
                <Row className="justify-content-center">
                  <Col md={10}>
                    <p className="fs-5 text-justify">
                      “Es un grupo de trabajadores presididos por el Representante, los cuales canalizan opiniones y promueven la participación, en un proceso previo, anterior a la toma de decisiones, referente a políticas y situaciones relevantes en Matriz de Seguridad y Salud Ocupacional”.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </section>

          {/* Imagen inferior */}
          <Row className="justify-content-center mt-5">
            <Col md={8} className="text-center">
              <Image
                src="/images/comite.png"
                fluid
                rounded
                style={{
                  border: '2px solid #c62828'
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
