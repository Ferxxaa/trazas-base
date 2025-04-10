import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Card, Button, Container, Row, Col, Accordion } from 'react-bootstrap';
import { FaHardHat, FaTools, FaBuilding } from 'react-icons/fa';
import { Box } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);  // Estado para controlar el acordeón

  const cardData = [
    {
      icon: <FaBuilding />,
      title: 'Comité de Consulta y Participación',
      text: 'Es un grupo de trabajadores presididos por el Representante, los cuales canalizan opiniones y promueven la participación.',
      route: '/comite',
      imgSrc: '/images/rp.jpg'  // Imagen para la tarjeta
    },
    {
      icon: <FaHardHat />,
      title: 'Recursos Humanos y Administración',
      text: 'Puedes comunicarte con nosotros, estamos atentos a recibir sus consultas. Recuerda que todos los mensajes son confidenciales.',
      route: '/recursos-humanos',
      imgSrc: '/images/rp.jpg'  // Imagen para la tarjeta
    },
    {
      icon: <FaTools />,
      title: 'Hechos Relevantes',
      text: 'Una breve descripción de los hechos más relevantes. Descubre todas nuestras novedades.',
      route: '/hechos-relevantes',
      imgSrc: '/images/hechos-relevantes.jpg'  // Imagen para la tarjeta
    }
  ];

  const newsData = [
    {
      title: 'Beneficios Caja los Andes',
      description: 'Haz clic para ver los beneficios.',
      route: '/noticia1',
      imgSrc: '/images/caja.png',
      details: (
        <Accordion activeKey={expanded ? '0' : null}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Beneficios</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Salud Dental Integrmédica.</li>
                <li>Beneficios Financieros.</li>
                <li>Descuentos en Viajes y Destinos en todo Chile.</li>
                <li>Bonos Familiares.</li>
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
      title: 'Hechos Relevantes del mes',
      description: 'Este mes hemos logrado avances significativos en la mejora de nuestros procesos internos.',
      route: '/noticia3',
      imgSrc: '/images/noticia3.jpg'
    }
  ];

  const handleAccordionToggle = () => {
    setExpanded(!expanded);  // Cambiar el estado para abrir o cerrar el acordeón
  };

  return (
    <Box pt={10} style={{ 
        backgroundImage: 'url(/images/marmol3.jpg)',  
        backgroundSize: 'cover',  
        backgroundPosition: 'center',  
        minHeight: '100vh',  
    }}>
      {/* Carrusel */}
      <Carousel fade interval={5000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/ArqIng-B.png"
            alt="First slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel4.png"
            alt="Second slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel5.png"
            alt="Third slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Cards */}
      <Container fluid className="py-5 px-4">
        <Row className="justify-content-center">
          {cardData.map((item, index) => (
            <Col key={index} md={4} sm={6} className="d-flex align-items-stretch mb-4">
              <Card className="w-100 shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #d7a77e', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Img variant="top" src={item.imgSrc} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ color: '#e60000' }}>
                    {item.icon} <span style={{ marginLeft: '10px' }}>{item.title}</span>
                  </Card.Title>
                  <Card.Text style={{ color: '#424242', flexGrow: 1 }}>{item.text}</Card.Text>
                  <Button
                    variant="danger"
                    className="mt-3 align-self-start"
                    onClick={() => navigate(item.route)}
                  >
                    Ver más
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Noticias */}
      <Container fluid className="py-5 px-4" style={{ backgroundColor: '#f1f1f1' }}>
        <Row className="justify-content-center">
          <Col md={12} className="text-center mb-4">
            <h2>Últimas Noticias</h2>
          </Col>
          {newsData.map((news, index) => (
            <Col key={index} md={4} sm={6} className="d-flex align-items-stretch mb-4">
              <Card className="w-100 shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #d7a77e', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Img variant="top" src={news.imgSrc} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ color: '#e60000' }}>{news.title}</Card.Title>
                  <Card.Text style={{ color: '#424242', flexGrow: 1 }}>{news.description}</Card.Text>
                  {news.details ? (
                    <Button
                      variant="danger"
                      className="mt-3 align-self-start"
                      onClick={handleAccordionToggle}
                    >
                      {expanded ? 'Ver menos' : 'Leer más'}
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      className="mt-3 align-self-start"
                      onClick={() => navigate(news.route)}
                    >
                      Leer más
                    </Button>
                  )}
                  {expanded && news.details}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Box>
  );
};

export default Home;
