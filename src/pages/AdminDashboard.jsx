import * as React from 'react';
import { db } from '../firebase';  // Ensure the path is correct
import { ref, get } from 'firebase/database';
import { Typography, Grid, Paper, Container, Box } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Navigator from './Navigator';
import Header from './Header'; // Assuming you have a Header component
import Content from './Content'; // Assuming you have a Content component

const COLORS = [
  '#8B0000', '#696969', '#D3D3D3', '#DC143C', '#FF4500', '#A52A2A', '#800000', '#B22222'
];

const Dashboard = () => {
  const [usuariosTotales, setUsuariosTotales] = React.useState(0);
  const [graficoUsuarios, setGraficoUsuarios] = React.useState([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosRef = ref(db, 'usuarios'); // Path to the users data in Firebase
        const snapshot = await get(usuariosRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('📦 Datos desde Firebase:', data);

          const usuarios = Object.values(data);
          setUsuariosTotales(usuarios.length);

          const datosParaGrafico = usuarios.map((user) => ({
            name: user.correo || 'Sin correo',
            value: 1,
          }));

          setGraficoUsuarios(datosParaGrafico);
        } else {
          console.warn('⚠️ No se encontraron usuarios en Firebase.');
        }
      } catch (error) {
        console.error('❌ Error al obtener datos de Firebase:', error);
      }
    };

    fetchUsuarios(); // Fetch data on mount
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 256;
  const theme = createTheme({
    palette: {
      primary: { main: '#009be5' },
    },
    typography: {
      h5: { fontWeight: 500, fontSize: 26 },
    },
    shape: { borderRadius: 8 },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <Navigator PaperProps={{ style: { width: drawerWidth } }} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#D3D3D3' }}>
                    <Typography variant="h6" color="textSecondary">Usuarios Registrados</Typography>
                    <Typography variant="h3" color="primary">{usuariosTotales}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, backgroundColor: '#D3D3D3' }}>
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
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
