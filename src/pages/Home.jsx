import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ArenaList from './ArenaList';

const Home = ({ user, userType }) => {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Bem-vindo ao Sistema de Agendamento de Beach Tênis</Typography>
        {user && userType === 'owner' && (
          <Typography variant="h6">
            Você é um proprietário. <a href="/arena/new">Cadastre sua arena</a>
          </Typography>
        )}
        {user && userType === 'admin' && (
          <Typography variant="h6">
            Você é um administrador.
          </Typography>
        )}
        <ArenaList />
      </Box>
    </Container>
  );
};

export default Home;
