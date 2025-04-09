import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Container, Box, CircularProgress, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Importación del Navbar
import Navbar from '../components/Navbar';

// Importar Firebase
import { db } from '../firebase'; // Asegúrate de que la ruta sea correcta
import { ref, get, set, remove, update } from 'firebase/database'; // Importar las funciones necesarias

// Definimos los colores que usaremos
const ITALIAN_RED = '#C62B27';  // Rojo italiano
const LIGHT_GRAY = '#D3D3D3';  // Gris claro

// Colores para las celdas del gráfico
const COLORS = [
  ITALIAN_RED, '#A9A9A9', '#808080', '#D3D3D3', '#B0C4DE', '#F08080', '#FF6347', '#8B0000'
];

const Dashboard = () => {
  const [usuariosTotales, setUsuariosTotales] = useState(0);
  const [graficoUsuarios, setGraficoUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioForm, setUsuarioForm] = useState({ nombre: '', correo: '' }); // Estado para formulario de usuario
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para abrir el diálogo de agregar/editar
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para edición

  // Obtener usuarios desde Firebase
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
            id: user.id, // Agregar ID para modificar/eliminar
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

  const handleAddUser = () => {
    const newUserId = Date.now().toString(); // Crear un ID único para el nuevo usuario
    set(ref(db, `usuarios/${newUserId}`), {
      id: newUserId,
      nombre: usuarioForm.nombre,
      correo: usuarioForm.correo,
    })
      .then(() => {
        setIsDialogOpen(false);
        setUsuarioForm({ nombre: '', correo: '' });
      })
      .catch((error) => console.error('Error al agregar usuario:', error));
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;
    update(ref(db, `usuarios/${selectedUser.id}`), {
      nombre: usuarioForm.nombre,
      correo: usuarioForm.correo,
    })
      .then(() => {
        setIsDialogOpen(false);
        setUsuarioForm({ nombre: '', correo: '' });
        setSelectedUser(null);
      })
      .catch((error) => console.error('Error al actualizar usuario:', error));
  };

  const handleDeleteUser = (userId) => {
    remove(ref(db, `usuarios/${userId}`))
      .then(() => {
        console.log('Usuario eliminado');
        // Volver a obtener los datos después de eliminar
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
              }));
              setGraficoUsuarios(datosParaGrafico);
            }
          })
          .catch((error) => console.error('Error al obtener los datos:', error));
      })
      .catch((error) => console.error('Error al eliminar usuario:', error));
  };

  const theme = createTheme({
    palette: {
      primary: { main: ITALIAN_RED },  // Usamos rojo italiano como color primario
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
        <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: LIGHT_GRAY }}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {/* Caja de usuarios registrados */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: LIGHT_GRAY }}>
                  <Typography variant="h6" color="textSecondary">Usuarios Registrados</Typography>
                  <Typography variant="h3" color="primary">
                    {loading ? <CircularProgress /> : usuariosTotales}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)}>
                    Agregar Usuario
                  </Button>
                </Paper>
              </Grid>
              
              {/* Gráfico de usuarios por nombre */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, backgroundColor: LIGHT_GRAY }}>
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

              {/* Aquí mostramos los usuarios en una lista con opciones de modificar y eliminar */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3, backgroundColor: LIGHT_GRAY }}>
                  <Typography variant="h6" gutterBottom color="textSecondary">
                    Lista de Usuarios
                  </Typography>
                  <ul>
                    {graficoUsuarios.map((user) => (
                      <li key={user.id}>
                        {user.name}
                        <Button onClick={() => {
                          setSelectedUser(user);
                          setUsuarioForm({ nombre: user.name, correo: user.correo });
                          setIsDialogOpen(true);
                        }}>Modificar</Button>
                        <Button color="error" onClick={() => handleDeleteUser(user.id)}>Eliminar</Button>
                      </li>
                    ))}
                  </ul>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Dialog para agregar/modificar usuarios */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>{selectedUser ? 'Modificar Usuario' : 'Agregar Usuario'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            value={usuarioForm.nombre}
            onChange={(e) => setUsuarioForm({ ...usuarioForm, nombre: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Correo"
            fullWidth
            value={usuarioForm.correo}
            onChange={(e) => setUsuarioForm({ ...usuarioForm, correo: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">Cancelar</Button>
          <Button
            onClick={selectedUser ? handleUpdateUser : handleAddUser}
            color="primary"
          >
            {selectedUser ? 'Actualizar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Dashboard;
