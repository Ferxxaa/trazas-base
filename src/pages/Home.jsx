import React from 'react';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', paddingTop: '70px' }}>
      {/* Carrusel */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: '#f5f5f5' }}>Bienvenido a nuestra empresa</h3>
            <p style={{ color: '#eeeeee' }}>Descubre más sobre nosotros y nuestros productos</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: '#f5f5f5' }}>Innovación y calidad</h3>
            <p style={{ color: '#eeeeee' }}>Siempre a la vanguardia con productos de alta calidad.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: '#f5f5f5' }}>Compromiso con nuestros clientes</h3>
            <p style={{ color: '#eeeeee' }}>Tu satisfacción es nuestra prioridad.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Cards debajo del carrusel */}
      <Container className="mt-5">
        <Row>
          <Col md={4} className="mb-4">
            <Card style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
              <Card.Body>
                <Card.Title style={{ color: '#c62828' }}>Card title 1</Card.Title>
                <Card.Text style={{ color: '#424242' }}>
                  Una breve descripción de la primera card. Conozca más sobre nuestros servicios y productos.
                </Card.Text>
                <Button variant="danger">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
              <Card.Body>
                <Card.Title style={{ color: '#c62828' }}>Card title 2</Card.Title>
                <Card.Text style={{ color: '#424242' }}>
                  Una breve descripción de la segunda card. ¡No te pierdas nuestras ofertas!
                </Card.Text>
                <Button variant="danger">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
              <Card.Body>
                <Card.Title style={{ color: '#c62828' }}>Card title 3</Card.Title>
                <Card.Text style={{ color: '#424242' }}>
                  Una breve descripción de la tercera card. Descubre todas nuestras novedades.
                </Card.Text>
                <Button variant="danger">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
