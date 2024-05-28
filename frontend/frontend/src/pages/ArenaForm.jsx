import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { storage, firestore, auth } from '../firebase';

const ArenaForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const arenaData = {
      name,
      price,
      ownerId: user.uid,
      photos: [],
    };

    try {
      const arenaRef = await firestore.collection('arenas').add(arenaData);

      const uploadPromises = photos.map(photo => {
        const photoRef = storage.ref(`arenas/${arenaRef.id}/${photo.name}`);
        return photoRef.put(photo).then(() => photoRef.getDownloadURL());
      });

      const photoUrls = await Promise.all(uploadPromises);
      await arenaRef.update({ photos: photoUrls });

      setName('');
      setPrice('');
      setPhotos([]);
    } catch (error) {
      console.error('Erro ao cadastrar arena:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Cadastro de Arena</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome da Arena"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Preço por Horário"
            type="number"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ArenaForm;
