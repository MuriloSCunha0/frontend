import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Typography, Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Calendar from '../components/Calendar';
import Comments from '../components/Comments';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    width: '100%',
  },
}));

const ArenaProfile = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [arena, setArena] = useState(null);

  useEffect(() => {
    const fetchArena = async () => {
      const arenaDoc = await getDoc(doc(db, 'arenas', id));
      if (arenaDoc.exists()) {
        setArena(arenaDoc.data());
      } else {
        console.error("Arena not found");
      }
    };

    fetchArena();
  }, [id]);

  if (!arena) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4">{arena.name}</Typography>
      <Grid container spacing={3}>
        {arena.photos && arena.photos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className={classes.paper}>
              <img src={photo} alt={`Arena ${index}`} className={classes.image} />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6">Price per Hour: {arena.price}</Typography>
      <Typography variant="h6">Address: {arena.address}</Typography>
      <Calendar arenaId={id} />
      <Comments arenaId={id} />
    </Container>
  );
};

export default ArenaProfile;
