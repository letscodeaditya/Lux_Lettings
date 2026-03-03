import { useEffect, useState } from "react";
import "./StayDetails.css";

export default function StayDetails() {
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // TEMP IMAGE LINKS (you can replace later)
  const imageLinks = [
    "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
    "https://images.unsplash.com/photo-1505691723494-fb4d8d1dcb80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    "https://images.unsplash.com/photo-1505691733877-32f05f85a7f9",
  ];

  // Fetch property data from backend
  useEffect(() => {
    // const fetchProperty = async () => {
    //   try {
    //     // Example: GET /api/properties/:id
    //     const res = await fetch("http://localhost:5000/api/properties/12345");

    //     const data = await res.json();
    //     setProperty(data);
    //     setMainImage(imageLinks[0]); // first image default
    //   } catch (err) {
    //     console.error("Error fetching property:", err);
    //   }
    // };

    // fetchProperty();
    const data = {
  "index": "01",
  "location": "Bangalore, India",
  "title1": "Luxury Stay",
  "title2": "Private Villa",
  "description": "A premium villa with pool...",
  "tags": ["Pool", "WiFi", "Parking"],
  "price": 4999
}
    setProperty(data);
  }, []); 

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-page">

      {/* ================= HERO ================= */}
      <section className="property-hero">
        <div className="hero-main">
          <img src={mainImage} alt="Property" />
        </div>

        <div className="hero-thumbs">
          {imageLinks.map((img, index) => (
            <img
              key={index}
              src={img}
              className={mainImage === img ? "active-thumb" : ""}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="property-details">
        <p className="p-index">{property.index}</p>
        <p className="p-location">{property.location}</p>
        <h1 className="p-title">
          {property.title1} <br />
          <em>{property.title2}</em>
        </h1>

        <p className="p-description">{property.description}</p>

        <div className="p-tags">
          {property.tags?.map((t, idx) => (
            <span key={idx} className="p-tag">
              • {t}
            </span>
          ))}
        </div>
      </section>

      {/* ================= BOOKING PANEL ================= */}
      <section className="booking-panel">
        <h3>Book Your Stay</h3>

        <div className="booking-fields">
          <div className="field">
            <label>Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Guests</label>
            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              {[1, 2, 3, 4, 5].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="price-box">
          <span className="price-label">Per Night</span>
          <span className="price-value">₹ {property.price}</span>
        </div>

        <button className="book-btn">BOOK NOW</button>
      </section>
    </div>
  );
}