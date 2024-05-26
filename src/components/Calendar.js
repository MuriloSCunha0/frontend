import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ date, setDate }) => {
  return (
    <Calendar
      onChange={setDate}
      value={date}
    />
  );
};

export default CustomCalendar;
