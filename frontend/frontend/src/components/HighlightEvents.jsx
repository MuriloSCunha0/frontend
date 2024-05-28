// src/components/HighlightEvents.jsx
import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  event: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

const HighlightEvents = ({ events }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Upcoming Events and Tournaments
      </Typography>
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className={classes.event}>
              <Typography variant="h6">{event.name}</Typography>
              <Typography>{event.date}</Typography>
              <Typography>{event.location}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default HighlightEvents;
