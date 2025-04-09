import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Container, Box, CircularProgress } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Importación del Navbar
import Navbar from '../components/Navbar';

// Importar Firebase
import { db } from '../firebase'; // Asegúrate de que la ruta sea correcta
import { ref, get } from 'firebase/database'; // Importar las funciones necesarias

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

  useEffect(() => {
    // Obtener los usuarios desde la base de datos de Firebase
    const usuariosRef = ref(db, 'usuarios'); // Ruta a los datos de usuarios en Firebase Realtime Database
    get(usuariosRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usuarios = snapshot.val(); // Datos de usuarios obtenidos
          console.log("Usuarios obtenidos de Firebase:", usuarios); // Ver los datos en la consola
          
          // Convertir los usuarios en un array
          const usuariosArray = Object.values(usuarios); // Obtenemos un array de los valores de 'usuarios'

          console.log("Array de usuarios:", usuariosArray); // Ver los usuarios convertidos en array

          setUsuariosTotales(usuariosArray.length);

          // Crear los datos para el gráfico usando el campo "nombre" de cada usuario
          const datosParaGrafico = usuariosArray.map((user) => ({
            name: user.nombre || 'Sin nombre', // Usamos el nombre del usuario
            value: 1,
          }));

          console.log("Datos para el gráfico:", datosParaGrafico); // Ver los datos para el gráfico

          setGraficoUsuarios(datosParaGrafico);
        } else {
          console.log('No hay datos disponibles');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        
        {/* Agregamos el Navbar */}
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
                        label={({ name }) => name} // Aquí mostramos el nombre del usuario
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
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
