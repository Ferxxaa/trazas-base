import React from 'react';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaHardHat, FaTools, FaBuilding } from 'react-icons/fa';
import { Box } from '@mui/material';  // Asegúrate de importar Box

const Home = () => {
  return (
    <Box pt={10} style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}> {/* Añadido Box con padding-top */}
      {/* Carrusel full width */}
      <Carousel fade interval={5000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrusel2.png"
            alt="First slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3 style={{ color: '#f5f5f5' }}>Bienvenido a nuestra empresa</h3>
            <p style={{ color: '#eeeeee' }}>Descubre más sobre nosotros y nuestros productos</p>
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
            <h3 style={{ color: '#f5f5f5' }}>Innovación y calidad</h3>
            <p style={{ color: '#eeeeee' }}>Siempre a la vanguardia con productos de alta calidad.</p>
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
            <h3 style={{ color: '#f5f5f5' }}>Compromiso con nuestros clientes</h3>
            <p style={{ color: '#eeeeee' }}>Tu satisfacción es nuestra prioridad.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Cards debajo del carrusel */}
      <Container fluid className="py-5 px-4">
        <Row className="justify-content-center">
          {[{
            icon: <FaBuilding />,
            title: 'Construcción de Edificaciones',
            text: 'Una breve descripción de la primera card. Conozca más sobre nuestros servicios y productos.'
          }, {
            icon: <FaHardHat />,
            title: 'Proyectos Industriales',
            text: 'Una breve descripción de la segunda card. ¡No te pierdas nuestras ofertas!'
          }, {
            icon: <FaTools />,
            title: 'Reformas y Remodelaciones',
            text: 'Una breve descripción de la tercera card. Descubre todas nuestras novedades.'
          }].map((item, index) => (
            <Col key={index} md={4} sm={6} className="d-flex align-items-stretch mb-4">
              <Card className="w-100 shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }}>
                <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ color: '#e60000' }}>
                    {item.icon} <span style={{ marginLeft: '10px' }}>{item.title}</span>
                  </Card.Title>
                  <Card.Text style={{ color: '#424242', flexGrow: 1 }}>{item.text}</Card.Text>
                  <Button variant="danger" className="mt-3 align-self-start">Ver más</Button>
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
