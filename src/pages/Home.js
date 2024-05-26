import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Box textAlign="center" my={5}>
        <Typography variant="h2" gutterBottom>
          Bem-vindo à Arena de Beach Tênis
        </Typography>
        <Typography variant="h5" gutterBottom>
          Por favor, faça login ou registre-se para agendar horários.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/register">
            Registrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
