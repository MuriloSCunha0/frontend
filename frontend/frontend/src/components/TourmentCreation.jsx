import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const TournamentCreation = ({ arenaId }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTournament = async () => {
    if (name && date && description) {
      await addDoc(collection(db, 'tournaments'), {
        arenaId,
        name,
        date,
        description,
      });
      setName('');
      setDate('');
      setDescription('');
      alert('Tournament created successfully!');
    }
  };

  return (
    <Container>
      <Typography variant="h5">Create Tournament</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <Button onClick={handleCreateTournament} variant="contained" color="primary">
        Create
      </Button>
    </Container>
  );
};

export default TournamentCreation;
