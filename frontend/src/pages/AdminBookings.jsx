import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./AdminBookings.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const fetchBookings = async (currentPage = 1) => {
    try {
      const res = await api.get(
        `/api/booking/all?page=${currentPage}&limit=${limit}`
      );

      setBookings(res.data.bookings);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  useEffect(() => {
    fetchBookings(page);
  }, [page]);

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    await api.put(`/api/booking/cancel/${id}`);
    fetchBookings(page);
  };

  return (
    <div className="admin-bookings">
      <h2>All Bookings</h2>

      <table>
        <thead>
          <tr>
            <th>Property ID</th>
            <th>Guest</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.propertyId}</td>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.phone}</td>
              <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
              <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
              <td>₹{booking.amountPaid}</td>
              <td className={`status ${booking.status}`}>
                {booking.status}
              </td>

              <td className="actions">
                {booking.status !== "cancelled" && (
                  <button
                    className="cancel-btn"
                    onClick={() => cancelBooking(booking._id)}
                  >
                    Cancel
                  </button>
                )}

               
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={page === index + 1 ? "active-page" : ""}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}