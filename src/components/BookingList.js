import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const BookingList = ({ bookings, handleDeleteBooking }) => {
  return (
    <List>
      {bookings.map((booking) => (
        <ListItem key={booking.id}>
          <ListItemText
            primary={new Date(booking.date).toLocaleDateString()}
            secondary={booking.time}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteBooking(booking.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default BookingList;
