import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaHardHat, FaTools, FaBuilding } from 'react-icons/fa';
import { Box } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      icon: <FaBuilding />,
      title: 'Comite de Consulta y Participacíon',
      text: 'Es un grupo de trabajadores presididos por el Representante, los cuales canalizan opiniones y promueven la participacion.',
      route: '/comite'
    },
    {
      icon: <FaHardHat />,
      title: 'Recursos Humanos y Administración',
      text: 'Puedes Comunicarte con nosotros, estamos atentos a recibir sus consultas, Recuerda que todos los mensajes son confidenciales.',
      route: '/recursos-humanos'
    },
    {
      icon: <FaTools />,
      title: 'Hechos Relevantes',
      text: 'Una breve descripción de la tercera card. Descubre todas nuestras novedades.',
      route: '/hechos-relevantes'
    }
  ];

  return (
    <Box pt={10} style={{ 
        backgroundImage: 'url(/images/marmol3.jpg)',  // Ruta de la imagen de fondo
        backgroundSize: 'cover',  // Hace que la imagen cubra toda la pantalla
        backgroundPosition: 'center',  // Centra la imagen
        minHeight: '100vh',  // Asegura que el fondo cubra toda la altura de la pantalla
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
          <Carousel.Caption>
            <h3 style={{ color: '#f5f5f5' }}></h3>
            <p style={{ color: '#eeeeee' }}></p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel2.png"
            alt="Second slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3 style={{ color: '#f5f5f5' }}></h3>
            <p style={{ color: '#eeeeee' }}></p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel2.png"
            alt="Third slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3 style={{ color: '#f5f5f5' }}></h3>
            <p style={{ color: '#eeeeee' }}></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Cards */}
      <Container fluid className="py-5 px-4">
        <Row className="justify-content-center">
          {cardData.map((item, index) => (
            <Col key={index} md={4} sm={6} className="d-flex align-items-stretch mb-4">
              <Card className="w-100 shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #d7a77e', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}> {/* Relieve café claro */}
                <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
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
    </Box>
  );
};

export default Home;
