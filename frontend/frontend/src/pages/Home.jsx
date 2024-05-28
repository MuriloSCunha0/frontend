// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Rating } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HighlightEvents from '../components/HighlightEvents';


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(0),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  media: {
    height: 140,
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [arenas, setArenas] = useState([]);
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([
    // Example events data
    { name: 'Beach Tennis Championship', date: 'June 15, 2024', location: 'Arena A' },
    { name: 'Summer Tournament', date: 'July 20, 2024', location: 'Arena B' },
    { name: 'City Beach Tennis Cup', date: 'August 10, 2024', location: 'Arena C' },
  ]);

  useEffect(() => {
    const fetchArenas = async () => {
      const querySnapshot = await getDocs(collection(db, 'arenas'));
      const arenasList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArenas(arenasList);
    };

    fetchArenas();
  }, []);

  const filteredArenas = arenas.filter(arena =>
    arena.name.toLowerCase().includes(search.toLowerCase()) ||
    arena.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className={classes.container}>
      <Header onSearch={(value) => setSearch(value)} onProfileClick={() => console.log('Profile clicked')} />
      <HighlightEvents events={events} />
      <Typography variant="h4" gutterBottom>Arenas</Typography>
      <Grid container spacing={3}>
        {filteredArenas.map(arena => (
          <Grid item xs={12} sm={6} md={4} key={arena.id}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={arena.photos ? arena.photos[0] : 'https://via.placeholder.com/300'}
                alt={arena.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">{arena.name}</Typography>
                <Typography variant="body2" color="textSecondary">{arena.address}</Typography>
                <Typography variant="body2" color="textSecondary">{arena.description}</Typography>
                <div className={classes.rating}>
                  <Rating value={arena.rating} readOnly />
                  <Typography variant="body2" color="textSecondary">({arena.rating})</Typography>
                </div>
                <Link to={`/arena/${arena.id}`} style={{ textDecoration: 'none' }}>
                  <Typography variant="button" color="primary" display="block">View Arena</Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
