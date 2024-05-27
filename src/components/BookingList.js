import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { firestore, auth } from '../firebase';

const BookingList = ({ bookings, setBookings }) => {
  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await firestore.collection('bookings').where('userId', '==', auth.currentUser.uid).get();
      const fetchedBookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(fetchedBookings);
    };

    fetchBookings();
  }, [setBookings]);

  const handleDelete = async (id) => {
    try {
      await firestore.collection('bookings').doc(id).delete();
      setBookings((prevBookings) => prevBookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error('Erro ao deletar reserva:', error);
    }
  };

  return (
    <List>
      {bookings.map((booking) => (
        <ListItem key={booking.id}>
          <ListItemText
            primary={new Date(booking.date).toLocaleDateString()}
            secondary={booking.time}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(booking.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default BookingList;
