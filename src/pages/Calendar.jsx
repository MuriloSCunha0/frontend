import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { firestore, auth } from '../firebase';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setOpenDialog(true);
  };

  const handleEditEvent = () => {
    // Implementar edição de evento
    setOpenDialog(false);
  };

  const handleDeleteEvent = () => {
    // Implementar exclusão de evento
    setOpenDialog(false);
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
          eventClick={handleEventClick}
        />
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Detalhes da Reserva</DialogTitle>
          <DialogContent>
            {selectedEvent && (
              <Box>
                <Typography variant="subtitle1">Nome: {selectedEvent.title}</Typography>
                <Typography variant="subtitle2">Data: {selectedEvent.startStr}</Typography>
                {/* Adicione mais informações da reserva aqui, se necessário */}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditEvent} color="primary">
              Editar
            </Button>
            <Button onClick={handleDeleteEvent} color="secondary">
              Excluir
            </Button>
            <Button onClick={() => setOpenDialog(false)} color="default">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Calendar;
