import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const ArenaList = () => {
  const [arenas, setArenas] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchArenas = async () => {
      const querySnapshot = await getDocs(collection(db, 'arenas'));
      const arenasList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArenas(arenasList);
    };

    fetchArenas();
  }, []);

  const handleAddArena = async () => {
    try {
      await addDoc(collection(db, 'arenas'), {
        name,
        price,
        address,
      });
      alert('Arena added successfully!');
    } catch (error) {
      console.error('Error adding arena', error);
      alert('Error adding arena');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Arena List</Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth />
      <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
      <Button variant="contained" color="primary" onClick={handleAddArena}>Add Arena</Button>
      <div>
        {arenas.map((arena) => (
          <div key={arena.id}>
            <Typography variant="h6">{arena.name}</Typography>
            <Typography>{arena.price}</Typography>
            <Typography>{arena.address}</Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ArenaList;
