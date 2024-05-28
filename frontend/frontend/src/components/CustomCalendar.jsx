import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box } from '@mui/material';

const CustomCalendar = ({ date, setDate, bookings }) => {
  return (
    <Box>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={({ date, view }) => {
          const dayBookings = bookings.filter(booking => new Date(booking.date).toDateString() === date.toDateString());
          return dayBookings.length > 0 ? <span>🔵</span> : null;
        }}
      />
    </Box>
  );
};

export default CustomCalendar;
