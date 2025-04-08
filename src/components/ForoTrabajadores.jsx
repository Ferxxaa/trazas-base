import React, { useEffect, useState } from 'react';
import { db, auth, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from '../firebase'; // Asegúrate de importar Firestore y las funciones necesarias
import { Navigate } from 'react-router-dom';
import { Container, Typography, Button, TextField, Card, CardContent } from '@mui/material';

const ForoTrabajadores = () => {
  const [posts, setPosts] = useState([]); // Estado para los posts
  const [role, setRole] = useState(null); // Estado para el rol del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const [newPost, setNewPost] = useState({ title: '', content: '' }); // Estado para crear nuevos posts

  // Obtener los mensajes del foro desde Firestore
  const getPosts = async () => {
    try {
      const postsCollection = collection(db, 'foros');
      const snapshot = await getDocs(postsCollection);
      const postsList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      console.log(postsList); // Verificar que los datos estén siendo recuperados
      setPosts(postsList);
    } catch (error) {
      console.error('Error obteniendo los posts: ', error);
    }
  };

  // Obtener el rol del usuario
  const getUserRole = async () => {
    if (!auth.currentUser) return;
    try {
      const userDoc = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));
      if (userDoc.exists()) {
        setRole(userDoc.data().role);
      }
    } catch (error) {
      console.error("Error al obtener el rol: ", error);
    } finally {
      setLoading(false); // Cambiar el estado de carga
    }
  };

  // Función para crear un nuevo post (solo disponible para administradores)
  const handleCreatePost = async () => {
    if (role !== 'admin') return;

    try {
      await addDoc(collection(db, 'foros'), { // Referencia correcta a la colección
        title: newPost.title,
        content: newPost.content,
        createdAt: new Date(),
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName,
        role: 'admin', // El autor es un admin
      });
      setNewPost({ title: '', content: '' }); // Limpiar el formulario
      getPosts(); // Recargar los posts
    } catch (error) {
      console.error("Error al crear el post: ", error);
    }
  };

  // Función para eliminar un post (solo disponible para administradores)
  const handleDeletePost = async (id) => {
    if (role !== 'admin') return;

    try {
      await deleteDoc(doc(db, 'foros', id)); // Eliminar el post usando su id
      getPosts(); // Recargar los posts
    } catch (error) {
      console.error("Error al eliminar el post: ", error);
    }
  };

  // Función para editar un post (solo disponible para administradores)
  const handleEditPost = async (id, updatedContent) => {
    if (role !== 'admin') return;

    try {
      await updateDoc(doc(db, 'foros', id), { // Actualizar el post usando su id
        content: updatedContent,
      });
      getPosts(); // Recargar los posts
    } catch (error) {
      console.error("Error al editar el post: ", error);
    }
  };

  // Obtener los posts y el rol del usuario al montar el componente
  useEffect(() => {
    getPosts();
    getUserRole();
  }, []);

  if (loading) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  // Si el rol no es admin, redirigimos al usuario
  if (role !== 'admin' && role !== 'usuario') {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Foro de Trabajadores
      </Typography>

      {/* Si el usuario es admin, puede crear un post */}
      {role === 'admin' && (
        <div>
          <TextField
            label="Título"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contenido"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleCreatePost}>
            Crear Post
          </Button>
        </div>
      )}

      {/* Mostrar los posts */}
      {posts.map((post) => (
        <Card key={post.id} variant="outlined" sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="body1">{post.content}</Typography>
            <Typography variant="subtitle2">Publicado por: {post.authorName}</Typography>
            {role === 'admin' && (
              <div>
                <Button variant="outlined" color="secondary" onClick={() => handleDeletePost(post.id)}>
                  Eliminar
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleEditPost(post.id, 'Nuevo contenido')}>
                  Editar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default ForoTrabajadores;
