import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import CustomCalendar from '../components/CustomCalendar';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);

  // Replace with actual fetch from backend
  useEffect(() => {
    const fetchBookings = async () => {
      // Fetch bookings from backend
      setBookings([]);
    };
    fetchBookings();
  }, []);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Calendário de Agendamentos
        </Typography>
        <Box mb={3}>
          <CustomCalendar date={date} setDate={setDate} bookings={bookings} />
        </Box>
        <BookingForm date={date} setBookings={setBookings} />
        <BookingList bookings={bookings} setBookings={setBookings} />
      </Box>
    </Container>
  );
};

export default Dashboard;
