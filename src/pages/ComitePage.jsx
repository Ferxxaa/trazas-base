import React from 'react';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaFileAlt, FaBullseye } from 'react-icons/fa';  // Íconos correctos
import Navbar from '../components/Navbar';

const ComitePage = () => {
  const navigate = useNavigate();

  // Estilo del botón igual al de Home
  const btnStyle = {
    backgroundColor: '#b32400',  // Mismo color de fondo
    border: 'none',  // Sin borde
    borderRadius: '10px',  // Radio de borde igual
    padding: '10px 18px',  // Padding igual al de Home
    minWidth: '200px',  // Mínimo ancho igual
    fontSize: '0.9rem',  // Mismo tamaño de fuente
    fontWeight: '500',  // Mismo peso de fuente
    transition: 'transform 0.2s ease, background-color 0.3s ease', // Animación
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',  // Sombra similar
    cursor: 'pointer',  // Cursor pointer
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',  // Centra el texto
  };

  const handleHover = (e) => {
    e.target.style.backgroundColor = '#9c2c00'; // Cambio de color al pasar el ratón
    e.target.style.transform = 'scale(1.05)'; // Escala al hacer hover
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = '#b32400'; // Color original
    e.target.style.transform = 'scale(1)'; // Escala original
  };

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
          <div className="text-center mb-5">
  <Row className="justify-content-center mt-3">
    <Col md={3} className="mb-3">
      <Button
        onClick={() => navigate('/')}
        style={btnStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseOut}
      >
        <div style={{ flex: '0 0 auto', marginRight: '10px', fontSize: '1.3rem' }}>
          <FaHome />
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          Inicio
        </div>
      </Button>
    </Col>
    <Col md={3} className="mb-3">
      <Button
        onClick={() => navigate('/politica')}
        style={btnStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseOut}
      >
        <div style={{ flex: '0 0 auto', marginRight: '10px', fontSize: '1.3rem' }}>
          <FaFileAlt />
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          Política de Seguridad
        </div>
      </Button>
    </Col>
    <Col md={3} className="mb-3">
      <Button
        onClick={() => navigate('/objetivos')}
        style={btnStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseOut}
      >
        <div style={{ flex: '0 0 auto', marginRight: '10px', fontSize: '1.3rem' }}>
          <FaBullseye />
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          Objetivos
        </div>
      </Button>
    </Col>
  </Row>
</div>


          {/* Título */}
          <h1 className="text-center mb-5" style={{ color: '#c62828' }}>
            Comité de Consulta y Participación
          </h1>

          {/* Sección Comité */}
          <section id="comite">
            <Row className="justify-content-center mb-5">
              {/* Card para las imágenes */}
              <Col md={6} className="mb-4">
                <Card className="mb-4">
                  <Card.Body>
                    <Row className="justify-content-center">
                      {[{ nombre: 'Randall Ortega', img: '/images/Randall.png' },
                        { nombre: 'Luis Puente', img: '/images/Puente.png' },
                        { nombre: 'Nelson Muñoz', img: '/images/Nelson.png' }]
                        .map((persona, index) => (
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
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Sombra
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
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Sombra
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
