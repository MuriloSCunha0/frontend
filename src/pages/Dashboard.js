import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { Container, Typography, Box } from '@mui/material';
import BookingList from '../components/BookingList';
import BookingForm from '../components/BookingForm';
import Calendar from '../components/Calendar';




const Dashboard = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(collection(db, 'bookings'), where('user', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setBookings(data);
    };
    fetchBookings();
  }, [user]);

  const handleBooking = async (date, time) => {
    try {
      await addDoc(collection(db, 'bookings'), { user: user.uid, date: date.toISOString(), time });
      setBookings([...bookings, { user: user.uid, date: date.toISOString(), time }]);
    } catch (error) {
      console.error('Erro ao criar agendamento', error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error('Erro ao deletar agendamento', error);
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Calendário de Agendamentos
        </Typography>
        <Box mb={3}>
          <Calendar date={date} setDate={setDate} />
        </Box>
        <BookingForm handleBooking={handleBooking} />
        <BookingList bookings={bookings} handleDeleteBooking={handleDeleteBooking} />
      </Box>
    </Container>
  );
};

export default Dashboard;
