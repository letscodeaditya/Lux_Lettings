import React, { useEffect, useState } from "react";

import "./AdminMessages.css";
import api from "../api/axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMessages = async (pageNum) => {
    try {
      const res = await api.get(`/api/contact/all?page=${pageNum}`);

      setMessages(res.data.contacts);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
      console.log(res);
    } catch (error) {
      console.error("Error fetching messages");
    }
  };

  useEffect(() => {
    fetchMessages(page);
  }, [page]);

  return (
<div className="msg-container">
  <h2>Contact Messages</h2>

  <div className="msg-card">
    <table className="msg-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {messages.map((msg) => (
          <tr key={msg._id}>
            <td>{msg.firstName}</td>

            <td className="email-text">
              {msg.email}
            </td>

            <td className="msg-preview">
              {msg.message}
            </td>

            <td>
              {new Date(msg.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span className="page-text">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  </div>
</div>
  );
};

export default AdminMessages;