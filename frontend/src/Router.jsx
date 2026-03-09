import { Routes, Route,BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Stays from './pages/Stays';
import Contact from './pages/Contact';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProtected from './routes/AdminProtected';
import CreateAdminTemp from './pages/CreateAdminTemp';
import StayDetails from './pages/StayDetails';
import Payment from './pages/Payment';
import CreateProperty from './components/CreateProperty';
import AdminMessages from './pages/AdminMessages';
import EditProperty from './components/EditProperty';
import AdminPropertyList from './components/AdminPropertyList';
import NotFound from './pages/NotFound';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminBookings from './pages/AdminBookings';
;

export default function AppRouter() {
  return (
    
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/stays" element={<Stays />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path ="/stays/:id" element={<StayDetails/>}/>
      <Route path="/payment/:id/:start/:end/:nights/:amount" element={<Payment/>}/>
      <Route path="/admin/create-temp" element={<CreateAdminTemp />} />
      <Route path="/booking-success" element={<PaymentSuccess/>} />


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
      <Route
        path="/admin/create-property"
        element={
          <AdminProtected>
            <CreateProperty/>
          </AdminProtected>
        }
      />
      <Route
        path="/admin/property-list"
        element={
          <AdminProtected>
            <AdminPropertyList/>
          </AdminProtected>
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          <AdminProtected>
            <EditProperty/>
          </AdminProtected>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <AdminProtected>
            <AdminMessages/>
          </AdminProtected>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <AdminProtected>
            <AdminBookings/>  
          </AdminProtected>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
