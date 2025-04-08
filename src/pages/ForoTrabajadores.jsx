import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { ref, onValue, push, remove, update, get } from 'firebase/database';
import { Container, Typography, Button, TextField, Card, CardContent } from '@mui/material';

const ForoTrabajadores = () => {
  const [posts, setPosts] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const getPosts = () => {
    const postsRef = ref(db, 'foros');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const postsList = data
        ? Object.keys(data).map(id => ({ id, ...data[id] }))
        : [];
      setPosts(postsList);
    });
  };

  const getUserRole = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = ref(db, `usuarios/${user.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setRole(snapshot.val().role);
      }
    } catch (error) {
      console.error("Error al obtener el rol: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (role !== 'admin') return;

    const postRef = ref(db, 'foros');
    await push(postRef, {
      title: newPost.title,
      content: newPost.content,
      createdAt: new Date().toISOString(),
      authorId: auth.currentUser.uid,
      authorName: auth.currentUser.displayName,
      role: 'admin',
    });

    setNewPost({ title: '', content: '' });
  };

  const handleDeletePost = async (id) => {
    if (role !== 'admin') return;

    const postRef = ref(db, `foros/${id}`);
    await remove(postRef);
  };

  const handleEditPost = async (id, updatedContent) => {
    if (role !== 'admin') return;

    const postRef = ref(db, `foros/${id}`);
    await update(postRef, { content: updatedContent });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = '/';
      } else {
        getUserRole();
        getPosts();
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Typography variant="h6">Cargando...</Typography>;

  if (role !== 'admin' && role !== 'usuario') {
    window.location.href = '/';
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Foro de Trabajadores
      </Typography>

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
