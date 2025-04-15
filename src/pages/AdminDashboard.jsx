import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Container, Box, CircularProgress, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './Dashboard.css'; // Asegúrate de que la ruta es correcta

// Importación del Navbar
import Navbar from '../components/Navbar';

// Importar Firebase
import { db, auth } from '../firebase';
import { ref, get, set, remove, update } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const ITALIAN_RED = '#C62B27';  
const LIGHT_GRAY = '#F4F6F9';  

const COLORS = [
  ITALIAN_RED, '#A9A9A9', '#808080', '#D3D3D3', '#B0C4DE', '#F08080', '#FF6347', '#8B0000'
];

const Dashboard = () => {
  const [usuariosTotales, setUsuariosTotales] = useState(0);
  const [graficoUsuarios, setGraficoUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioForm, setUsuarioForm] = useState({ nombre: '', apellido: '', correo: '', password: '', rut: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const usuariosRef = ref(db, 'usuarios');
    get(usuariosRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usuarios = snapshot.val();
          const usuariosArray = Object.values(usuarios);
          setUsuariosTotales(usuariosArray.length);
          const datosParaGrafico = usuariosArray.map((user) => ({
            name: user.nombre || 'Sin nombre',
            value: 1,
            id: user.id,
            apellido: user.apellido || 'Sin apellido',
            correo: user.correo || 'No disponible',
          }));
          setGraficoUsuarios(datosParaGrafico);
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Método para registrar un nuevo usuario
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!usuarioForm.password || !usuarioForm.nombre || !usuarioForm.apellido || !usuarioForm.rut) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    try {
      let userCredential;
      if (usuarioForm.correo) {
        userCredential = await createUserWithEmailAndPassword(auth, usuarioForm.correo, usuarioForm.password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, 'default@domain.com', usuarioForm.password);
      }

      const user = userCredential.user;
      const userRef = ref(db, 'usuarios/' + user.uid);
      await set(userRef, {
        nombre: usuarioForm.nombre,
        apellido: usuarioForm.apellido,
        rut: usuarioForm.rut,
        correo: usuarioForm.correo || null,
      });

      alert('Usuario creado con éxito');
      setIsDialogOpen(false);
      setUsuarioForm({ nombre: '', apellido: '', correo: '', password: '', rut: '' });
    } catch (error) {
      console.error('Error al registrar usuario: ', error);
      alert('Hubo un error al crear la cuenta');
    }
  };

  // Método para agregar un usuario manualmente
  const handleAddUser = () => {
    const newUserId = Date.now().toString();
    set(ref(db, `usuarios/${newUserId}`), {
      id: newUserId,
      nombre: usuarioForm.nombre,
      apellido: usuarioForm.apellido,
      correo: usuarioForm.correo,
      rut: usuarioForm.rut,
    })
      .then(() => {
        setIsDialogOpen(false);
        setUsuarioForm({ nombre: '', apellido: '', correo: '', password: '', rut: '' });
      })
      .catch((error) => console.error('Error al agregar usuario:', error));
  };

  // Método para actualizar un usuario existente
  const handleUpdateUser = () => {
    if (!selectedUser) return;

    update(ref(db, `usuarios/${selectedUser.id}`), {
      nombre: usuarioForm.nombre,
      apellido: usuarioForm.apellido,
      correo: usuarioForm.correo,
      rut: usuarioForm.rut,
    })
      .then(() => {
        setIsDialogOpen(false);
        setUsuarioForm({ nombre: '', apellido: '', correo: '', password: '', rut: '' });
        setSelectedUser(null);
      })
      .catch((error) => console.error('Error al actualizar usuario:', error));
  };

  // Método para eliminar un usuario
  const handleDeleteUser = (userId) => {
    remove(ref(db, `usuarios/${userId}`))
      .then(() => {
        console.log('Usuario eliminado');
        const usuariosRef = ref(db, 'usuarios');
        get(usuariosRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const usuarios = snapshot.val();
              const usuariosArray = Object.values(usuarios);
              setUsuariosTotales(usuariosArray.length);
              const datosParaGrafico = usuariosArray.map((user) => ({
                name: user.nombre || 'Sin nombre',
                value: 1,
                id: user.id,
                apellido: user.apellido || 'Sin apellido',
                correo: user.correo || 'No disponible',
              }));
              setGraficoUsuarios(datosParaGrafico);
            }
          })
          .catch((error) => console.error('Error al obtener los datos:', error));
      })
      .catch((error) => console.error('Error al eliminar usuario:', error));
  };

  // Tema de la aplicación
  const theme = createTheme({
    palette: {
      primary: { main: ITALIAN_RED },
    },
    typography: {
      h5: { fontWeight: 500, fontSize: 26 },
    },
    shape: { borderRadius: 8 },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <CssBaseline />
        <Navbar />
        <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: LIGHT_GRAY, pt: 15 }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
              {/* Caja de usuarios registrados */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'white', boxShadow: 3 }}>
                  <Typography variant="h6" color="textSecondary">Usuarios Registrados</Typography>
                  <Typography variant="h3" color="primary">
                    {loading ? <CircularProgress /> : usuariosTotales}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)} sx={{ mt: 2 }}>
                    Agregar Usuario
                  </Button>
                </Paper>
              </Grid>

              {/* Gráfico de usuarios por nombre */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, bgcolor: 'white', boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom color="textSecondary">
                    Usuarios por Nombre
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={graficoUsuarios}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        dataKey="value"
                        label={({ name }) => name}
                      >
                        {graficoUsuarios.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Lista de usuarios */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3, bgcolor: 'white', boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom color="textSecondary">
                    Lista de Usuarios
                  </Typography>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>ID</th>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Nombre</th>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Apellido</th>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Correo</th>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {graficoUsuarios.map((user, index) => (
                          <tr key={index}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.id}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.name}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.apellido}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.correo}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                              <Button color="primary" onClick={() => handleDeleteUser(user.id)}>
                                Eliminar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Diálogo de creación de usuario */}
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Crear Usuario</DialogTitle>
          <DialogContent>
            <TextField
              label="Nombre"
              fullWidth
              value={usuarioForm.nombre}
              onChange={(e) => setUsuarioForm({ ...usuarioForm, nombre: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Apellido"
              fullWidth
              value={usuarioForm.apellido}
              onChange={(e) => setUsuarioForm({ ...usuarioForm, apellido: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Correo"
              fullWidth
              value={usuarioForm.correo}
              onChange={(e) => setUsuarioForm({ ...usuarioForm, correo: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              value={usuarioForm.password}
              onChange={(e) => setUsuarioForm({ ...usuarioForm, password: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="RUT"
              fullWidth
              value={usuarioForm.rut}
              onChange={(e) => setUsuarioForm({ ...usuarioForm, rut: e.target.value })}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)} color="primary">Cancelar</Button>
            <Button onClick={handleRegister} color="primary">Registrar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
