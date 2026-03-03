import { useState } from 'react';
import api from '../api/axios';

export default function CreateProperty() {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    location: '',
    price: '',
    description: '',
    tags: '',
  });

  const [images, setImages] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags.split(','),
      images,
    };

    const token = localStorage.getItem('adminToken');

    await api.post('/properties', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert('Property Created');
  };

  return (
    <div className="card">
      <h2>Create New Property</h2>

      <form onSubmit={submitHandler} className="admin-form">
        <input
          type="text"
          placeholder="Property Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price per night"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />

        <textarea
          placeholder="Enter Image URLs (one per line)"
          onChange={(e) => setImages(e.target.value.split('\n'))}
        />

        <button type="submit">Create Property</button>
      </form>
    </div>
  );
}
