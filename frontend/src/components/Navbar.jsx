import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Navbar() {
  useEffect(() => {
    const nav = document.getElementById('mainNav');

    function onScroll() {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="mainNav">
      <Link to="/" className="nav-logo">
        Lux Lettings
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/stays">STAYS</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
        <li>
          <Link to="/contact">CONTACT</Link>
        </li>
      </ul>

      <Link to="/stays" className="nav-book">
        Book Now
      </Link>
    </nav>
  );
}
