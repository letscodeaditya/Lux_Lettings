import { useState } from 'react';
import CreateProperty from '../components/CreateProperty';
import PropertyList from '../components/PropertyList';
import BookedDates from '../components/BookedDates';
import './admin.css';

export default function AdminDashboard() {
  const [tab, setTab] = useState('create');
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h3>Admin Panel</h3>

        <button onClick={() => setTab('create')}>Create Property</button>
        <button onClick={() => setTab('list')}>View Properties</button>
        <button onClick={() => setTab('bookings')} disabled={!selectedProperty}>
          View Booked Dates
        </button>
      </aside>

      <main className="main-content">
        {tab === 'create' && <CreateProperty />}
        {tab === 'list' && (
          <PropertyList setSelectedProperty={setSelectedProperty} />
        )}
        {tab === 'bookings' && selectedProperty && (
          <BookedDates propertyId={selectedProperty} />
        )}
      </main>
    </div>
  );
}
