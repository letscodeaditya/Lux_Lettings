import React from "react";
import "./AdminDashboard.css";
import { FaHome, FaEnvelope, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdAddHomeWork } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("adminToken"); // remove auth token
   

    navigate("/admin/login");
  };

  return (
    <div className="admin-container">

      <div className="admin-header">

        <h1 className="admin-title">Admin Dashboard</h1>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>

      </div>

      <div className="dashboard-grid">

        {/* Create Property */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/create-property")}
        >
          <MdAddHomeWork className="card-icon"/>
          <h3>Create Property</h3>
          <p>Add new property listing</p>
        </div>

        {/* Edit Property */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/property-list")}
        >
          <FaHome className="card-icon" />
          <h3>Edit Property</h3>
          <p>Edit or remove property</p>
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