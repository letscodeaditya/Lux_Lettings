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
        path="/admin/messages"
        element={
          <AdminProtected>
            <AdminMessages/>
          </AdminProtected>
        }
      />
    </Routes>
  );
}
