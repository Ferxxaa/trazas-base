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

      
      {/* Foro de Publicaciones */}
<Container className="py-5 px-4">
  <Row>
    <Col md={12} className="text-center mb-4">
      <h2 style={{ fontWeight: 600 }}>Foro del Administrador</h2>
      <p>Publicaciones hechas por el administrador. Los usuarios pueden dejar comentarios.</p>
    </Col>

    {/* Simulación de un post del admin */}
    <Col md={8} className="mx-auto">
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h5>🔔 Nueva política de seguridad</h5>
        <p>Estamos implementando nuevas medidas de seguridad en el área de trabajo. Por favor, revisa el documento adjunto y deja tus comentarios.</p>
        
        {/* Comentarios */}
        <div style={{ marginTop: '20px' }}>
          <h6>Comentarios:</h6>
          <ul>
            <li>Usuario1: Me parece excelente medida.</li>
            <li>Usuario2: ¿Cuándo comienza a aplicarse?</li>
          </ul>
          
          {/* Agregar nuevo comentario */}
          <form>
            <textarea
              placeholder="Escribe tu comentario..."
              className="form-control mb-2"
              rows="3"
            />
            <Button variant="dark">Comentar</Button>
          </form>
        </div>
      </div>
    </Col>
  </Row>
</Container>
    </Box>
  );
};

export default Home;
