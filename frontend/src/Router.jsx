import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Stays from './pages/Stays';
import Contact from './pages/Contact';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProtected from './routes/AdminProtected';
import CreateAdminTemp from './pages/CreateAdminTemp';
import AvailabilityCalendar from './components/Calendar';
import StayDetails from './pages/StayDetails';

export default function AppRouter() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/stays" element={<Stays />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path ="/:propertyId" element={StayDetails}/>
      <Route path="/stays/detail" element={<StayDetails/>} />
      <Route path="/admin/create-temp" element={<CreateAdminTemp />} />
      {/* ADMIN ROUTES */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtected>
            <AdminDashboard />
          </AdminProtected>
        }
      />
    </Routes>
  );
}
