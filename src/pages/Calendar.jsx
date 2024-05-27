import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { firestore, auth } from '../firebase';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await firestore.collection('reservations').get();
      const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  const handleDateClick = (info) => {
    const title = prompt('Nome da reserva:');
    const newEvent = {
      title,
      start: info.dateStr,
      userId: auth.currentUser.uid,
    };

    firestore.collection('reservations').add(newEvent).then((docRef) => {
      setEvents([...events, { id: docRef.id, ...newEvent }]);
    });
  };

  return (
    <Container maxWidth="lg" className="calendar-container">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Calendário de Reservas</Typography>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
        />
      </Box>
    </Container>
  );
};

export default Calendar;
