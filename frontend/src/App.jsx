import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRouter from './Router';

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
}
