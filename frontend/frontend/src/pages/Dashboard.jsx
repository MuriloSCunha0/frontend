import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ImageUpload from '../components/ImageUpload';
import ReservationStats from '../components/ReservationStats';
import TournamentCreation from '../components/TourmentCreation';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const OwnerDashboard = () => {
  const classes = useStyles();
  const [arenas, setArenas] = useState([]);
  const [selectedArena, setSelectedArena] = useState(null);

  useEffect(() => {
    const fetchArenas = async () => {
      const querySnapshot = await getDocs(collection(db, 'arenas'));
      const arenasList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArenas(arenasList);
    };

    fetchArenas();
  }, []);

  const handleDeleteArena = async (id) => {
    try {
      await deleteDoc(doc(db, 'arenas', id));
      setArenas(arenas.filter((arena) => arena.id !== id));
      alert('Arena deleted successfully!');
    } catch (error) {
      console.error('Error deleting arena', error);
      alert('Error deleting arena');
    }
  };

  const handleSelectArena = (arena) => {
    setSelectedArena(arena);
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4">Owner Dashboard</Typography>
      <Grid container spacing={3}>
        {arenas.map((arena) => (
          <Grid item xs={12} sm={6} md={4} key={arena.id}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{arena.name}</Typography>
              <Button onClick={() => handleSelectArena(arena)} variant="contained" color="primary" className={classes.button}>
                Manage
              </Button>
              <Button color="secondary" onClick={() => handleDeleteArena(arena.id)} className={classes.button}>
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {selectedArena && (
        <div>
          <Typography variant="h5">Manage {selectedArena.name}</Typography>
          <ImageUpload arenaId={selectedArena.id} />
          <ReservationStats arenaId={selectedArena.id} />
          <TournamentCreation arenaId={selectedArena.id} />
        </div>
      )}
    </Container>
  );
};

export default OwnerDashboard;
