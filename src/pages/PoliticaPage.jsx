import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Navbar from '../components/Navbar';  // Asegurando que el Navbar se muestre
import { Link } from 'react-router-dom';

const PoliticaPage = () => {
  return (
    <>
      <Navbar /> {/* Asegurando que el Navbar se muestre */}

      <div style={{ paddingTop: '90px', backgroundColor: '#f8f9fa' }}> {/* Fondo claro y márgenes */}
        <Container className="py-5">
          {/* Botón para regresar al Comité */}
          <div className="text-center mb-5">
            <Link to="/comite">
              <button
                className="btn btn-outline-danger mx-3 mb-3 mb-sm-0"
                style={{
                  padding: '12px 30px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  transition: 'background-color 0.3s, border-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e57373';
                  e.target.style.borderColor = '#e57373';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#c62828';
                }}
              >
                Regresar al Comité
              </button>
            </Link>
          </div>

          {/* Título de la página */}
          <h1 className="text-center mb-5" style={{ color: '#c62828', fontFamily: 'Arial, sans-serif' }}>
            Política de Seguridad
          </h1>

          {/* Imagen debajo del título */}
          <Row className="justify-content-center mb-5">
            <Col xs={12} md={8}>
              <Image
                src="/images/politica.jpg"  // Asegúrate de tener esta imagen en la ruta correcta
                alt="Imagen de política"
                fluid
                rounded
                style={{ border: '2px solid #c62828' }}
              />
            </Col>
          </Row>

          {/* Sección de la política */}
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

export default PoliticaPage;
