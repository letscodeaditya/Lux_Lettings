import React from "react";
import "./AdminDashboard.css";
import { FaHome, FaEnvelope, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">

      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="dashboard-grid">

        {/* Create Property */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/create-property")}
        >
          <FaHome className="card-icon" />
          <h3>Create Property</h3>
          <p>Add new property listing</p>
        </div>

        {/* Contact Messages */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/messages")}
        >
          <FaEnvelope className="card-icon" />
          <h3>Contact Messages</h3>
          <p>View customer enquiries</p>
        </div>

        {/* Bookings */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/bookings")}
        >
          <FaCalendarCheck className="card-icon" />
          <h3>Bookings</h3>
          <p>Manage reservations</p>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;