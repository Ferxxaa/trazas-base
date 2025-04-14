import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PoliticaPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div
        style={{
          paddingTop: '90px',
          backgroundImage: 'url("/images/marmol3.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Container className="py-5">
          {/* Botones de navegación arriba */}
          
          {/* Botones de navegación arriba */}
                  <div className="text-center mb-5">
                    <Row className="justify-content-center mt-3">
                      <Col md={3} className="mb-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          block
                          onClick={() => navigate('/')} // Regresar al inicio
                          onMouseEnter={(e) => hoverBtn(e, true)} 
                          onMouseLeave={(e) => hoverBtn(e, false)}
                          style={btnStyle}
                        >
                          🏡 Inicio
                        </Button>
                      </Col>
                      {currentPath !== '/comite' && (
                        <Col md={3} className="mb-3">
                          <Button
                            variant="danger"
                            size="sm"
                            block
                            onClick={() => navigate('/comite')} // Ir a Comité
                            onMouseEnter={(e) => hoverBtn(e, true)} 
                            onMouseLeave={(e) => hoverBtn(e, false)}
                            style={btnStyle}
                          >
                            🧑‍🧒‍🧒 Comité
                          </Button>
                        </Col>
                      )}
                      {currentPath !== '/objetivos' && (
                        <Col md={3} className="mb-3">
                          <Button
                            variant="danger"
                            size="sm"
                            block
                            onClick={() => navigate('/objetivos')} // Ir a Política de Seguridad
                            onMouseEnter={(e) => hoverBtn(e, true)} 
                            onMouseLeave={(e) => hoverBtn(e, false)}
                            style={btnStyle}
                          >
                            🎯 Objetivos
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </div>

          <h1 className="text-center mb-5" style={{ color: '#c62828', fontFamily: 'Arial, sans-serif' }}>
            Política de Seguridad
          </h1>

          <Row className="justify-content-center mb-5">
            <Col xs={12} md={8}>
              <Image
                src="/images/politica.jpg"
                alt="Imagen de política"
                fluid
                rounded
                style={{ border: '2px solid #c62828' }}
              />
            </Col>
          </Row>

          <section id="politica" style={{ backgroundColor: '#e0e0e0', borderRadius: '10px', padding: '30px' }}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center" style={{ color: '#c62828', fontFamily: 'Arial, sans-serif' }}>
                  POLITICA
                </Card.Title>
                <Row className="justify-content-center">
                  <Col xs={12} md={10}>
                    <p className="fs-5 text-justify" style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>
                      Nuestra empresa se compone de un grupo diverso de profesionales con participación tanto en el área pública como privada, adquiriendo experiencia y especialización en el ámbito del Diseño, Construcción y Administración de proyectos de infraestructura para empresas corporativas.
                    </p>
                    <p className="fs-5 text-justify" style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>
                      Trazas, en su gestión involucra valores sociales y conocimiento técnico focalizado en el liderazgo de proyectos, creados desde la comprensión, la observación, la iniciativa, aseguramiento de calidad y la oportunidad en la toma de decisiones.
                    </p>
                    <p className="fs-5 text-justify" style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>
                      Trazas, desarrolla sus procesos bajo un Sistema de Gestión Integrado de Calidad, Medio Ambiente, Seguridad y Salud Ocupacional, en función de proporcionar confianza y satisfacción a nuestros clientes. Ante lo cual nos comprometemos a:
                    </p>
                    <ul style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>
                      <li>Cumplir con la legislación vigente y los requisitos que subscribamos con nuestros mandantes y proveedores.</li>
                      <li>Eliminar los peligros, reducir riesgos, proporcionando condiciones seguras y saludables, así como generar instancias de participación y consulta para nuestros Trabajadores.</li>
                      <li>Compromiso en ayudar, mejorar y cuidar el medio ambiente fomentando el desarrollo sostenible y previniendo daños de contaminación en todos nuestros procesos productivos.</li>
                      <li>Mejorar continuamente la eficacia de nuestros procesos y revisar sistemáticamente los objetivos, en función de esta política, con la finalidad de mejorar y profundizar nuestro Sistema de Gestión.</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </section>
        </Container>
      </div>
    </>
  );
};

// Estilo del botón
const btnStyle = {
  backgroundColor: '#c62828',
  border: '2px solid #c62828',
  color: 'white',
  fontWeight: 'bold',
  padding: '8px 16px',
  transition: 'background-color 0.3s, border-color 0.3s',
};

// Función para hover
const hoverBtn = (e, enter) => {
  e.target.style.backgroundColor = enter ? '#e57373' : '#c62828';
  e.target.style.borderColor = enter ? '#e57373' : '#c62828';
};

export default PoliticaPage;
