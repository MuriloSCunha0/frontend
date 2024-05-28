import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Admin = () => {
  const [reservations, setReservations] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const querySnapshot = await getDocs(collection(db, 'reservations'));
      const reservationsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReservations(reservationsList);
    };

    const fetchOwners = async () => {
      const querySnapshot = await getDocs(collection(db, 'owners'));
      const ownersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOwners(ownersList);
    };

    fetchReservations();
    fetchOwners();
  }, []);

  const handleDeleteReservation = async (id) => {
    try {
      await deleteDoc(doc(db, 'reservations', id));
      alert('Reservation deleted successfully!');
    } catch (error) {
      console.error('Error deleting reservation', error);
      alert('Error deleting reservation');
    }
  };

  const handleDeleteOwner = async (id) => {
    try {
      await deleteDoc(doc(db, 'owners', id));
      alert('Owner deleted successfully!');
    } catch (error) {
      console.error('Error deleting owner', error);
      alert('Error deleting owner');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Admin</Typography>
      <Typography variant="h6">Reservations</Typography>
      <div>
        {reservations.map((reservation) => (
          <div key={reservation.id}>
            <Typography>{reservation.title}</Typography>
            <Button variant="contained" color="secondary" onClick={() => handleDeleteReservation(reservation.id)}>Delete</Button>
          </div>
        ))}
      </div>
      <Typography variant="h6">Owners</Typography>
      <div>
        {owners.map((owner) => (
          <div key={owner.id}>
            <Typography>{owner.name}</Typography>
            <Button variant="contained" color="secondary" onClick={() => handleDeleteOwner(owner.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Admin;
