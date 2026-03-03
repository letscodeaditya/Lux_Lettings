import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function BookedDates({ propertyId }) {
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    const res = await api.get(`/bookings/${propertyId}`);
    setBookings(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [propertyId]);

  return (
    <div className="card">
      <h2>Booked Dates</h2>

      <ul>
        {bookings.map((b, idx) => (
          <li key={idx}>
            {b.checkIn} → {b.checkOut}
          </li>
        ))}
      </ul>
    </div>
  );
}
