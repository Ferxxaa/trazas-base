import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Button, Container, Row, Col, Accordion } from 'react-bootstrap';
import { FaHardHat, FaTools, FaBuilding, FaChevronDown } from 'react-icons/fa';
import { Box } from '@mui/material';

const fontFamilyStyle = {
  fontFamily: "'Poppins', sans-serif"
};

const Home = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const cardData = [
    {
      icon: <FaBuilding />,
      title: 'Consulta y Participación',
      text: 'Grupo de trabajadores presidido por el Representante, encargado de canalizar opiniones y promover la participación.',
      route: '/comite'
    },
    {
      icon: <FaHardHat />,
      title: 'Recursos Humanos y Administración',
      text: 'Puedes comunicarte con nosotros; estamos atentos a tus consultas.',
      route: '/recursos-humanos'
    },
    {
      icon: <FaTools />,
      title: 'Hechos Relevantes',
      text: 'Descripción breve de los hechos más destacados.',
      route: '/hechos-relevantes'
    }
  ];

  const newsData = [
    {
      title: 'Beneficios Caja Los Andes',
      description: 'Haz clic para conocer todos los beneficios disponibles.',
      route: '/noticia1',
      imgSrc: '/images/caja.png',
      details: (
        <Accordion activeKey={expanded ? '0' : null}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Beneficios</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Salud dental con Integramédica.</li>
                <li>Beneficios financieros.</li>
                <li>Descuentos en viajes y destinos por todo Chile.</li>
                <li>Bonos familiares.</li>
                <li>Descuentos en compras.</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
    },
    {
      title: 'Reformas en Recursos Humanos',
      description: 'Se han implementado nuevas políticas de bienestar para todos nuestros colaboradores.',
      route: '/noticia2',
      imgSrc: '/images/noticia2.jpg'
    },
    {
      title: 'Hechos Relevantes del Mes',
      description: 'Este mes logramos avances significativos en la mejora de nuestros procesos internos.',
      route: '/noticia3',
      imgSrc: '/images/noticia3.jpg'
    }
  ];

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box pt={10} style={{
      backgroundImage: 'url(/images/marmol3.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      ...fontFamilyStyle
    }}>
      {/* Carrusel */}
      <Carousel fade interval={5000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/ArqIng-B.png"
            alt="Primer slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel4.png"
            alt="Segundo slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel5.png"
            alt="Tercer slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Botones reemplazando las Cards */}
      {/* Botones reemplazando las Cards */}
<Container fluid className="py-5 px-4">
  <Row className="justify-content-center">
    {cardData.map((item, index) => (
      <Col key={index} md={5} sm={10} className="mb-4 d-flex justify-content-center">
        <Button
          variant="danger"
          onClick={() => navigate(item.route)}
          className="w-100 p-3 text-white shadow-sm"
          style={{
            fontSize: '1rem',
            backgroundColor: '#b32400',
            border: 'none',
            borderRadius: '10px',
            textAlign: 'left',
            minHeight: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            {item.icon}
            <strong>{item.title}</strong>
          </div>
          <div style={{ fontSize: '0.85rem' }}>{item.text}</div>
        </Button>
      </Col>
    ))}
  </Row>
</Container>

      {/* Noticias */}
      <Container fluid className="py-5 px-4" style={{ backgroundColor: '#f1f1f1' }}>
        <Row className="justify-content-center">
          <Col md={12} className="text-center mb-4">
            <h2 style={{ fontWeight: 600 }}>
              Infórmate Aquí <FaChevronDown style={{ marginLeft: '8px' }} />
            </h2>
          </Col>
          {newsData.map((news, index) => (
            <Col key={index} md={4} sm={6} className="d-flex align-items-stretch mb-4">
              <div className="w-100 shadow-sm" style={{
                backgroundColor: '#ffffff',
                border: '1px solid #d7a77e',
                padding: '20px',
                borderRadius: '10px'
              }}>
                <img src={news.imgSrc} alt={news.title} className="img-fluid mb-3" style={{ borderRadius: '8px' }} />
                <h5 style={{ color: '#e60000' }}>{news.title}</h5>
                <p style={{ color: '#080000' }}>{news.description}</p>
                {news.details ? (
                  <>
                    <Button
                      variant="danger"
                      className="mt-2"
                      onClick={handleAccordionToggle}
                    >
                      {expanded ? 'Ver menos' : 'Leer más'}
                    </Button>
                    {expanded && news.details}
                  </>
                ) : (
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => navigate(news.route)}
                  >
                    Leer más
                  </Button>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Box>
  );
};

export default Home;
