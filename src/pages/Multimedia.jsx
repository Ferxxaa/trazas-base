// src/pages/Multimedia.jsx
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Multimedia = () => {
  return (
    <Container>
      <h2 className="mt-4">Galería de Fotos</h2>
      <Row className="mt-4">
        <Col md={4}>
        <Image src="/images/multimedia11.jpg" fluid />

        </Col>
        <Col md={4}>
          <Image src="https://via.placeholder.com/400x300" fluid />
        </Col>
        <Col md={4}>
          <Image src="https://via.placeholder.com/400x300" fluid />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Image src="https://via.placeholder.com/400x300" fluid />
        </Col>
        <Col md={4}>
          <Image src="https://via.placeholder.com/400x300" fluid />
        </Col>
        <Col md={4}>
          <Image src="https://via.placeholder.com/400x300" fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default Multimedia;
