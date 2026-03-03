import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function PropertyList({ setSelectedProperty }) {
  const [props, setProps] = useState([]);

  const fetchProps = async () => {
    const res = await api.get('/properties');
    setProps(res.data);
  };

  useEffect(() => {
    fetchProps();
  }, []);

  return (
    <div className="card">
      <h2>All Properties</h2>

      <div className="property-list">
        {props.map((p) => (
          <div key={p._id} className="property-item">
            <img src={p.images[0]} alt="" />

            <div>
              <h3>{p.title}</h3>
              <p>{p.location}</p>

              <button onClick={() => setSelectedProperty(p._id)}>
                View Booked Dates
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
