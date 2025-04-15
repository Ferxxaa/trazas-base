import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import { Box } from '@mui/material';
import { FaComments, FaUsers, FaBook } from 'react-icons/fa';

const fontFamilyStyle = {
  fontFamily: "'Poppins', sans-serif"
};

const Home = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const isAdmin = true;

  const cardData = [
    { icon: <FaComments />, title: 'Consulta y Participación', route: '/comite' },
    { icon: <FaUsers />, title: 'Recursos Humanos', route: '/recursos-humanos' },
    { icon: <FaBook />, title: 'Hechos Relevantes', route: '/hechos-relevantes' }
  ];

  const [newsData, setNewsData] = useState([
    {
      title: 'Beneficios Caja Los Andes',
      description: 'Revisa los nuevos beneficios que tenemos para ti.',
      route: '/noticia1',
      imgSrc: '/images/caja.png',
      date: '10/04/2025',
      comments: [
        { text: "Usuario1: Me parece excelente medida." },
        { text: "Usuario2: ¿Cuándo comienza a aplicarse?" }
      ]
    },
    {
      title: 'Reformas en Recursos Humanos',
      description: 'Se han implementado nuevas políticas de bienestar para todos nuestros colaboradores.',
      route: '/noticia2',
      imgSrc: '/images/rp.jpg',
      date: '07/04/2025',
      comments: [
        { text: "Usuario3: Estas reformas son un gran paso." },
        { text: "Usuario4: Espero que se mantenga la transparencia." }
      ]
    },
    {
      title: 'Hechos Relevantes del Mes',
      description: 'Este mes logramos avances significativos en la mejora de nuestros procesos internos.',
      route: '/noticia3',
      imgSrc: '/images/home.jpg',
      date: '04/04/2025',
      comments: [
        { text: "Usuario5: Muy buenos avances, felicidades." },
        { text: "Usuario6: ¿Dónde puedo encontrar más detalles?" }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState({ title: '', description: '', imgSrc: '' });

  const handleCommentSubmit = (index, commentText) => {
    const newNewsData = [...newsData];
    newNewsData[index].comments.push({ text: `Nuevo Usuario: ${commentText}` });
    setNewsData(newNewsData);
  };

  const handleNewPostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.description || !newPost.imgSrc) return;

    const currentDate = new Date().toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const newPostData = {
      ...newPost,
      date: currentDate,
      comments: []
    };

    const updatedNews = [newPostData, ...newsData].sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number);
      const [dayB, monthB, yearB] = b.date.split('/').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateB - dateA;
    });

    setNewsData(updatedNews);
    setNewPost({ title: '', description: '', imgSrc: '' });
    setShowForm(false);
  };

  const handleDeletePost = (index) => {
    const updatedNews = [...newsData];
    updatedNews.splice(index, 1);
    setNewsData(updatedNews);
  };

  return (
    <Box style={{
      backgroundImage: 'url(/images/marmol3.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      paddingTop: '110px', // <-- Margen superior para separar del navbar
      ...fontFamilyStyle
    }}>
    
      {/* Carrusel */}
      <div style={{ position: 'relative' }}>
        <Carousel fade interval={5000}>
          <Carousel.Item>
            <img className="d-block w-100" src="/images/ArqIng-B.png" alt="Slide 1"
              style={{ maxHeight: '500px', objectFit: 'cover' }} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="/images/carrusel4.png" alt="Slide 2"
              style={{ maxHeight: '500px', objectFit: 'cover' }} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="/images/carrusel5.png" alt="Slide 3"
              style={{ maxHeight: '500px', objectFit: 'cover' }} />
          </Carousel.Item>
        </Carousel>

        <div style={{
          position: 'absolute',
          top: '38%',
          left: '50%',
          transform: 'translate(-50%, -38%)',
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif",
          zIndex: 10
        }}>
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.53)',
            padding: '6px 12px',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <h1 style={{ fontWeight: 600, fontSize: '1.8rem', color: '#ffffff', margin: 0 }}>INTRANET</h1>
            <h4 style={{ fontWeight: 400, fontSize: '1rem', color: '#ffffff', marginTop: '4px' }}>Más cerca de ti</h4>
          </div>
        </div>
      </div>

      {/* Botones tipo card con ícono a la izquierda */}
      <Container className="py-4 px-3">
        <Row className="g-3 justify-content-center">
          {cardData.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={3} className="d-flex justify-content-center">
              <Button
                onClick={() => navigate(item.route)}
                className="text-white"
                style={{
                  backgroundColor: '#b32400',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  minWidth: '200px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'transform 0.2s ease, background-color 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center'
                }}
              >
                <div style={{ flex: '0 0 auto', marginRight: '10px', fontSize: '1.3rem' }}>
                  {item.icon}
                </div>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  {item.title}
                </div>
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Foro de publicaciones */}
      <Container className="py-5 px-4">
        <Row>
          <Col md={12} className="text-center mb-4">
            <h2 style={{ fontWeight: 600 }}>Últimas Novedades</h2>
            <p>Acá encontrarás todo tipo de información.</p>
          </Col>

          {newsData.map((noticia, idx) => (
            <Col md={8} className="mx-auto" key={idx}>
              <div style={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <img src={noticia.imgSrc} alt={noticia.title} style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }} />
                <h5 style={{ marginTop: '15px' }}>{noticia.title}</h5>
                <small className="text-muted">Publicado el: {noticia.date}</small>
                <p>{noticia.description}</p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  {noticia.comments.map((comentario, i) => (
                    <div key={i} style={{
                      alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                      backgroundColor: i % 2 === 0 ? '#f1f0f0' : '#d1e7dd',
                      padding: '10px 15px',
                      borderRadius: '20px',
                      maxWidth: '80%',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <span style={{ fontSize: '0.9rem' }}>{comentario.text}</span>
                    </div>
                  ))}
                </div>

                <form style={{ marginTop: '20px' }} onSubmit={(e) => {
                  e.preventDefault();
                  const newComment = e.target.elements.comment.value;
                  handleCommentSubmit(idx, newComment);
                  e.target.elements.comment.value = '';
                }}>
                  <textarea
                    name="comment"
                    placeholder="Escribe tu comentario..."
                    className="form-control mb-2"
                    rows="3"
                  />
                  <Button variant="dark" type="submit">Comentar</Button>
                </form>

                {isAdmin && (
                  <Button variant="danger" size="sm" onClick={() => handleDeletePost(idx)} className="mt-3">
                    Eliminar publicación
                  </Button>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Publicador solo para admins */}
      {isAdmin && (
        <div className="mx-auto mb-5 text-center" style={{ maxWidth: '600px' }}>
          <Button
            variant="primary"
            onClick={() => setShowForm(!showForm)}
            style={{ marginBottom: '10px' }}
          >
            {showForm ? 'Ocultar formulario' : 'Crear nueva publicación'}
          </Button>

          {showForm && (
            <div style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <h4>Crear nueva publicación</h4>
              <input
                className="form-control mb-2"
                type="text"
                name="title"
                placeholder="Título"
                value={newPost.title}
                onChange={handleNewPostChange}
              />
              <textarea
                className="form-control mb-2"
                name="description"
                placeholder="Descripción"
                rows="3"
                value={newPost.description}
                onChange={handleNewPostChange}
              />
              <input
                className="form-control mb-2"
                type="text"
                name="imgSrc"
                placeholder="URL de imagen"
                value={newPost.imgSrc}
                onChange={handleNewPostChange}
              />
              <Button variant="success" onClick={handleAddPost}>Publicar</Button>
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default Home;
