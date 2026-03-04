import { useState } from 'react';
import api from '../api/axios';


export default function CreateAdminTemp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const createAdmin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        '/api/temp/create-temp-admin',
        {
          email,
          password,
        } 
      );

      setMsg(res.data.message);
    } catch (error) {
      setMsg(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={createAdmin}>
        <h2>Create Admin (Temporary)</h2>

        {msg && <p style={styles.message}>{msg}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button}>Create Admin</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f8f4ee',
  },
  card: {
    background: 'white',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '350px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  input: {
    padding: '12px',
    border: '1px solid #d6ccc2',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  button: {
    padding: '12px',
    background: '#3b2a21',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  message: {
    background: '#f4e6dd',
    padding: '10px',
    borderRadius: '4px',
    color: '#7a5b49',
    fontSize: '0.9rem',
  },
};
