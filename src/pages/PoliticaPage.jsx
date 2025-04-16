import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { FaHome, FaUsers, FaBullseye } from 'react-icons/fa';  // Íconos añadidos
import Navbar from '../components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

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
          backgroundColor: '#b32400',
        }}
      >
        <Container className="py-5">
          

          <h1 className="text-center mb-5" style={{ color: '#c62828', fontFamily: 'Poppins, sans-serif' }}>
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
  <Card.Title 
    className="text-center" 
    style={{
      color: '#c62828', 
      fontFamily: 'Poppins, sans-serif',
      fontSize: '2rem',
    }}
  >
    POLÍTICA
  </Card.Title>
  <Row className="justify-content-center">
    <Col xs={12} md={10}>
      <p
        className="fs-5"
        style={{
          color: '#333',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.1rem',
          textAlign: 'justify',
        }}
      >
        <strong>Nuestra empresa</strong> se compone de un grupo diverso de profesionales con participación tanto en el área pública como privada, adquiriendo experiencia y especialización en el ámbito del <strong>Diseño, Construcción y Administración</strong> de proyectos de infraestructura para empresas corporativas.
      </p>
      <p
        className="fs-5"
        style={{
          color: '#333',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.1rem',
          textAlign: 'justify',
        }}
      >
        <strong>Trazas</strong>, en su gestión involucra valores sociales y conocimiento técnico focalizado en el <strong>liderazgo de proyectos</strong>, creados desde la <strong>comprensión, la observación, la iniciativa</strong>, aseguramiento de calidad y la oportunidad en la toma de decisiones.
      </p>
      <p
        className="fs-5"
        style={{
          color: '#333',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.1rem',
          textAlign: 'justify',
        }}
      >
        <strong>Trazas</strong> desarrolla sus procesos bajo un <strong>Sistema de Gestión Integrado de Calidad, Medio Ambiente, Seguridad y Salud Ocupacional</strong>, en función de proporcionar <strong>confianza y satisfacción</strong> a nuestros clientes. Ante lo cual nos comprometemos a:
      </p>
      <ul
        style={{
          color: '#333',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.1rem',
          textAlign: 'justify',
        }}
      >
        <li><strong>Cumplir</strong> con la legislación vigente y los requisitos que subscribamos con nuestros mandantes y proveedores.</li>
        <li><strong>Eliminar los peligros</strong>, reducir riesgos, proporcionando condiciones seguras y saludables, así como generar instancias de <strong>participación y consulta</strong> para nuestros Trabajadores.</li>
        <li><strong>Comprometernos con el medio ambiente</strong> fomentando el desarrollo sostenible y previniendo daños de contaminación en todos nuestros procesos productivos.</li>
        <li><strong>Mejorar continuamente</strong> la eficacia de nuestros procesos y revisar sistemáticamente los objetivos, en función de esta política, con la finalidad de <strong>mejorar y profundizar</strong> nuestro Sistema de Gestión.</li>
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

// Función para hover
const hoverBtn = (e, enter) => {
  e.target.style.backgroundColor = enter ? '#e57373' : '#c62828';
  e.target.style.borderColor = enter ? '#e57373' : '#c62828';
};

export default PoliticaPage;
