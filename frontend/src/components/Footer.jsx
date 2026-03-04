import { useNavigate } from "react-router-dom";

export default function Footer() {
   const navigate = useNavigate();
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">LUX LETTINGS</span>
          <p className="footer-tagline">
            Iconic Addresses, Timeless Experiences. A collection of design-led
            luxury stays across India.
          </p>

          <div className="footer-social">
            <a href="#" className="social-btn">
              f
            </a>
            <a href="#" className="social-btn">
              in
            </a>
            <a href="#" className="social-btn">
              ig
            </a>
            <a href="#" className="social-btn">
              tw
            </a>
          </div>
        </div>

        <div>
          <p className="footer-col-title">Destinations</p>
          <ul className="footer-links">
            <li>
              <a href="#">Noida, Uttar Pradesh</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="footer-col-title">Quick Links</p>
          <ul className="footer-links">
            <li>
              <a href="#">Check-in & Check-out</a>
            </li>
            <li>
              <a href="#">Stay Policy</a>
            </li>
            <li>
              <a href="#">Stay Rules</a>
            </li>
            <li>
              <a href="" onClick={(e) => {
          e.preventDefault();
          navigate("/admin/login");
        }}>admin</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="footer-col-title">About</p>
          <ul className="footer-links">
            <li>
              <a href="#">Our Story</a>
            </li>
            <li>
              <a href="#">Our Vision</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
