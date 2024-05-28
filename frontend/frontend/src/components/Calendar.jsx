import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Calendar = ({ arenaId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const q = query(collection(db, 'reservations'), where('arenaId', '==', arenaId));
      const querySnapshot = await getDocs(q);
      const eventsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: 'Reserved',
        start: doc.data().date,
      }));
      setEvents(eventsList);
    };

    fetchReservations();
  }, [arenaId]);

  const handleDateClick = (arg) => {
    const title = prompt('Enter Event Title');
    if (title) {
      setEvents([...events, { title, date: arg.dateStr }]);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
