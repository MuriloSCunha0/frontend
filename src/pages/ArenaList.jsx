import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import { firestore } from '../firebase';

const ArenaList = () => {
  const [arenas, setArenas] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchArenas = async () => {
      const snapshot = await firestore.collection('arenas').get();
      const fetchedArenas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArenas(fetchedArenas);
    };

    fetchArenas();
  }, []);

  const filteredArenas = arenas.filter(arena =>
    arena.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Buscar Arenas</Typography>
        <TextField
          label="Pesquisar por nome"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Grid container spacing={4}>
          {filteredArenas.map((arena) => (
            <Grid item key={arena.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={arena.photos[0]}
                  alt={arena.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {arena.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Preço por horário: R${arena.price}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
                    Reservar Horário
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ArenaList;
