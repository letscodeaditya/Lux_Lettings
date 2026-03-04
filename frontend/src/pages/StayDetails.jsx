import { useEffect, useState } from "react";
import "./StayDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

import {
  FaHome,
  FaWifi,
  FaBriefcase,
  FaBath,
  FaLeaf,
  FaMapMarkerAlt,
  FaLock,
  FaGift,
} from "react-icons/fa";

export default function StayDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nights, setNights] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const [available, setAvailable] = useState(true);
  const [checking, setChecking] = useState(false);

  const guests = 1;

  // TEMP HERO IMAGES
  const heroImages = [
    "https://i.ibb.co/N6bwwZkF/Hall-2-JPG.jpg",
    'https://i.ibb.co/vC98qMDj/Balcony-JPG.jpg',
    'https://i.ibb.co/kVTFDQ7J/r9-JPG.jpg',
    
  ];

  const [mainHero, setMainHero] = useState(heroImages[0]);

  // Fetch property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/api/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [id]);

  // Check availability from backend
  useEffect(() => {
    const checkAvailability = async () => {
      if (!checkIn || !checkOut) return;

      setChecking(true);

      try {
        const res = await api.post("/api/booking/check-availability", {
          propertyId: id,
          checkIn,
          checkOut,
        });

        setAvailable(res.data.available);
      } catch (err) {
        console.error("Availability check error:", err);
      }

      setChecking(false);
    };

    checkAvailability();
  }, [checkIn, checkOut, id]);

  // Calculate pricing
  useEffect(() => {
    if (checkIn && checkOut && property) {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);

      const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));

      if (diff > 0) {
        setNights(diff);
        const base = diff * property.price;
        const t = base * 0.18;
        setTax(t);
        setTotal(base + t);
      } else {
        setNights(0);
      }
    }
  }, [checkIn, checkOut, property]);

  // Redirect to payment page
  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert("Select valid dates!");
      return;
    }
    if (!available) {
      alert("These dates are not available!");
      return;
    }

    navigate(
      `/payment/${id}/${checkIn}/${checkOut}/${nights}/${total}`
    );
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className="stay-luxe-container">

      {/* ================= HERO ================= */}
      <div className="luxe-hero" style={{ backgroundImage: `url(${mainHero})` }}>
        <div className="hero-gradient"></div>

        <div className="hero-text">
          <p className="breadcrumb">HOME › STAYS › {property.name}</p>
          <h1 className="hero-title">{property.name}</h1>
          <p className="hero-location">URBAN RETREAT · {property.location}</p>
        </div>

        <div className="hero-swatches">
          {heroImages.map((img, i) => (
            <div
              key={i}
              className={`swatch ${mainHero === img ? "active" : ""}`}
              onClick={() => setMainHero(img)}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>

        <p className="view-photos">CLICK TO VIEW ALL PHOTOS</p>
      </div>

      {/* ================= MAIN BODY ================= */}
      <div className="luxe-body">

        {/* LEFT AREA */}
        <div className="left-side">

          {/* OVERVIEW */}
          <section className="overview-section">
            <p className="section-label">OVERVIEW</p>

            <h1 className="overview-title">
              A Boutique in the <em>Heart of {property.location}</em>
            </h1>

            <div className="title-underline"></div>

            <div className="stats-container">
              <div className="stat-col">
                <h3 className="stat-number">1</h3>
                <p className="stat-label">SIGNATURE STUDIO</p>
              </div>

              <div className="stat-divider"></div>

              <div className="stat-col">
                <h3 className="stat-number">{property.capacity}</h3>
                <p className="stat-label">GUEST CAPACITY</p>
              </div>

              <div className="stat-divider"></div>

              <div className="stat-col">
                <h3 className="stat-number">4.9 ★</h3>
                <p className="stat-label">GUEST RATING</p>
              </div>

              <div className="stat-divider"></div>

              <div className="stat-col">
                <h3 className="stat-number">24/7</h3>
                <p className="stat-label">HOST SUPPORT</p>
              </div>
            </div>

            <p className="overview-desc">{property.description}</p>
          </section>

          {/* AMENITIES */}
          <section className="amenities-section">
            <p className="section-label">AMENITIES</p>
            <h2 className="amen-title">
              What's <em>Included</em>
            </h2>

            <div className="title-underline"></div>

            <div className="amen-grid">
              <div className="amen-item">
                <div className="amen-icon-box"><FaHome size={20} /></div>
                <div>
                  <h3 className="amen-title-small">Comfortable Studio</h3>
                  <p className="amen-desc">Designed for 2 guests</p>
                </div>
              </div>

              <div className="amen-item">
                <div className="amen-icon-box"><FaWifi size={20} /></div>
                <div>
                  <h3 className="amen-title-small">High-Speed Wi-Fi</h3>
                  <p className="amen-desc">Perfect for remote work</p>
                </div>
              </div>

              <div className="amen-item">
                <div className="amen-icon-box"><FaBriefcase size={20} /></div>
                <div>
                  <h3 className="amen-title-small">Work Desk</h3>
                  <p className="amen-desc">Ideal for working</p>
                </div>
              </div>

              <div className="amen-item">
                <div className="amen-icon-box"><FaBath size={20} /></div>
                <div>
                  <h3 className="amen-title-small">Fresh Linen</h3>
                  <p className="amen-desc">Clean & hygienic</p>
                </div>
              </div>

              <div className="amen-item">
                <div className="amen-icon-box"><FaLeaf size={20} /></div>
                <div>
                  <h3 className="amen-title-small">Quiet Area</h3>
                  <p className="amen-desc">Peaceful location</p>
                </div>
              </div>

              <div className="amen-item">
                <div className="amen-icon-box"><FaMapMarkerAlt size={20} /></div>
                <div>
                  <h3 className="amen-title-small">Prime Location</h3>
                  <p className="amen-desc">Well connected</p>
                </div>
              </div>

              <div className="amen-item">
                <div className="amen-icon-box"><FaLock size={20} /></div>
                <div>
                  <h3 className="amen-title-small">Secure Stay</h3>
                  <p className="amen-desc">Safe environment</p>
                </div>
              </div>

              <div className="amen-item">
                <div className="amen-icon-box"><FaGift size={20} /></div>
                <div>
                  <h3 className="amen-title-small">Essentials</h3>
                  <p className="amen-desc">Everything included</p>
                </div>
              </div>

              <div className="amen-empty"></div>
            </div>
          </section>

        </div>

        {/* RIGHT BOOKING PANEL */}
        <div className="right-side">
          <div className="booking-box">

            <h2 className="book-title">{property.name}</h2>
            <p className="book-location">{property.location}</p>

            <p className="availability-badge">AVAILABLE</p>

            <label className="input-label">ROOM TYPE</label>
            <select className="room-select">
              <option>Deluxe Room — ₹{property.price}/night</option>
            </select>

            <div className="dates-row">
              <div className="date-col">
                <label className="input-label">CHECK-IN</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div className="date-col">
                <label className="input-label">CHECK-OUT</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>

            {/* Availability Message */}
            {checking ? (
              <p className="checking">Checking availability...</p>
            ) : available ? (
              checkIn && checkOut && <p className="available">✔ Dates are available</p>
            ) : (
              checkIn && checkOut && (
                <p className="not-available">✖ Dates already booked</p>
              )
            )}

            <div className="price-summary">
              {nights > 0 && (
                <>
                  <div className="summary-row">
                    <p>₹{property.price} × {nights} nights</p>
                    <p>₹{property.price * nights}</p>
                  </div>

                  <div className="summary-row">
                    <p>Taxes (18%)</p>
                    <p>₹{Math.round(tax)}</p>
                  </div>

                  <hr />

                  <div className="summary-row total">
                    <p>Total</p>  
                    <p className="total-amount">₹{Math.round(total)}</p>
                  </div>
                </>
              )}
            </div>

            <button className="book-now-btn" onClick={handleBooking}>
              BOOK NOW
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}