import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia} from '@mui/material';
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
        {/* Adicionando imagens e dicas sobre beach tênis */}
        <Typography variant="h5" gutterBottom>Dicas e Informações sobre Beach Tênis</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="caminho_para_sua_imagem_1.jpg"
                alt="Imagem Beach Tênis 1"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Dica: Como melhorar seu saque no beach tênis.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="caminho_para_sua_imagem_2.jpg"
                alt="Imagem Beach Tênis 2"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Notícia: Campeonato mundial de beach tênis acontecerá em breve.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="caminho_para_sua_imagem_3.jpg"
                alt="Imagem Beach Tênis 3"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Saiba mais: Regras básicas do beach tênis para iniciantes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Adicionando componente ArenaList para listar arenas disponíveis */}
        <Typography variant="h5" gutterBottom>Encontre uma Arena de Beach Tênis próxima de você</Typography>
        <ArenaList />
      </Box>
    </Container>
  );
};

export default Home;
