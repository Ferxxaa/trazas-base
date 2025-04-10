import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
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

          {/* Botones para navegar a diferentes secciones */}
          <div className="text-center mb-5">
            <Button
              variant="outline-danger"
              size="lg"
              href="#politica"
              className="mx-3"
            >
              Política de Seguridad
            </Button>
            <Button
              variant="outline-danger"
              size="lg"
              href="#objetivos"
              className="mx-3"
            >
              Objetivos
            </Button>
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

          {/* Sección Política */}
          <section id="politica" className="my-5">
            <Card className="mb-5">
              <Card.Body>
                <Card.Title className="text-center" style={{ color: '#c62828' }}>Política </Card.Title>
                <Row className="justify-content-center">
                  <Col md={10}>
                    <p className="fs-5 text-justify">
                      La política de seguridad y salud ocupa un rol fundamental en la gestión preventiva de riesgos laborales, asegurando que todos los trabajadores estén protegidos bajo las normativas vigentes y las mejores prácticas.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </section>

          {/* Sección Objetivos */}
          <section id="objetivos" className="my-5">
            <Card className="mb-5">
              <Card.Body>
                <Card.Title className="text-center" style={{ color: '#c62828' }}>Objetivos del Comité</Card.Title>
                <Row className="justify-content-center">
                  <Col md={10}>
                    <p className="fs-5 text-justify">
                      El Comité tiene como objetivo principal promover la participación activa de los trabajadores, evaluar y proponer mejoras en los procesos de seguridad y salud laboral, y ser un canal de comunicación entre la dirección y el personal.
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
