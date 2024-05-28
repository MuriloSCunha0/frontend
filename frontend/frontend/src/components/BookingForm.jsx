import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { firestore, auth } from '../firebase';

const BookingForm = ({ date, setBookings }) => {
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const newBooking = {
      date: date.toISOString(),
      time,
      userId: user.uid,
      userName: user.email,
    };

    try {
      const docRef = await firestore.collection('bookings').add(newBooking);
      setBookings((prevBookings) => [...prevBookings, { id: docRef.id, ...newBooking }]);
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={3}>
      <TextField
        label="Data"
        type="date"
        fullWidth
        margin="normal"
        value={date.toISOString().substring(0, 10)}
        onChange={(e) => setTime(e.target.value)}
        required
        disabled
      />
      <TextField
        label="Hora"
        type="time"
        fullWidth
        margin="normal"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Agendar
      </Button>
    </Box>
  );
};

export default BookingForm;
