import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Bar } from 'react-chartjs-2';

const ReservationStats = ({ arenaId }) => {
  const [reservations, setReservations] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchReservations = async () => {
      const q = query(collection(db, 'reservations'), where('arenaId', '==', arenaId));
      const querySnapshot = await getDocs(q);
      const reservationsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReservations(reservationsList);
    };

    fetchReservations();
  }, [arenaId]);

  useEffect(() => {
    const processData = () => {
      const dates = reservations.map((res) => res.date.toDate().toLocaleDateString());
      const dateCount = dates.reduce((acc, date) => {
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(dateCount),
        datasets: [
          {
            label: 'Reservations',
            data: Object.values(dateCount),
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      });
    };

    processData();
  }, [reservations]);

  return (
    <div>
      <h3>Reservation Statistics</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default ReservationStats;
