import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const BookingForm = ({ handleBooking }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleBooking(date, time);
  };

  return (
    <Box component="form" onSubmit={onSubmit} mt={3}>
      <TextField
        label="Data"
        type="date"
        fullWidth
        margin="normal"
        value={date.toISOString().substring(0, 10)}
        onChange={(e) => setDate(new Date(e.target.value))}
        required
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
