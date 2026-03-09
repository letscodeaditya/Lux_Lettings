import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const location = useLocation();
  const printRef = useRef();

  const { property, checkIn, checkOut, amount, guest_name, guest_email, guest_phone , booking_id, property_id} = location.state || {};


  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="payment-success-container">

      <div ref={printRef} className="print-area">

        <div className="success-animation">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14 27l7 7 16-16"
            />
          </svg>
        </div>

        <h1 className="success-title">Payment Successful</h1>

        <p className="success-subtitle">
          Your booking has been confirmed successfully.
        </p>

        {property && (
          <div className="booking-info">
            <p><strong>Guest name:</strong> {guest_name}</p>
            <p><strong>Guest Email:</strong> {guest_email}</p>
            <p><strong>Guest Phone:</strong> {guest_phone}</p>
            <p><strong>Property Name:</strong> {property}</p>
            <p><strong>Property Id:</strong> {property_id}</p>
            <p><strong>Check-in:</strong> {checkIn}</p>
            <p><strong>Check-out:</strong> {checkOut}</p>
            <p><strong>Booking Id:</strong> {booking_id}</p>
            <p><strong>Amount Paid:</strong> ₹{amount}</p>
          </div>
        )}

      </div>

      {/* Print Button */}
      <button className="print-btn" onClick={handlePrint}>
        Print / Download Receipt
      </button>

    </div>
  );
};

export default PaymentSuccess;