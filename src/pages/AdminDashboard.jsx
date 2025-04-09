import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Container, Box, CircularProgress } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
    // Simulando la obtención de usuarios. Reemplaza esta parte con la llamada real a tu base de datos o API
    setTimeout(() => {
      const usuarios = [
        { correo: 'user1@example.com' },
        { correo: 'user2@example.com' },
        { correo: 'user3@example.com' },
        { correo: 'user4@example.com' },
        { correo: 'user5@example.com' },
      ];

      setUsuariosTotales(usuarios.length);

      const datosParaGrafico = usuarios.map((user) => ({
        name: user.correo || 'Sin correo',
        value: 1,
      }));

      setGraficoUsuarios(datosParaGrafico);
      setLoading(false);
    }, 1500);  // Simulación de tiempo de carga
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
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
