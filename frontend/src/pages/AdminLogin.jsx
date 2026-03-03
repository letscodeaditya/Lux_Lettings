import { useState } from 'react';
import api from '../api/axios';
import './admin.css';
import { Navigate } from 'react-router-dom';

export default function AdminLogin({ setAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  if (localStorage.getItem('adminToken')) {
    return <Navigate to="/admin/dashboard" />;
  }

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      setAdmin(true);
    } catch (err) {
      setMsg('Invalid Credentials');
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-box" onSubmit={loginHandler}>
        <h2>Admin Login</h2>

        {msg && <p className="error">{msg}</p>}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
