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

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
  const [loading,setLoading] = useState(true);
  const [mainHero, setMainHero] = useState(property?.images?.[0] || "");

  const guests = 1;

  // TEMP HERO IMAGES
  // const heroImages = [
  //   "https://i.ibb.co/N6bwwZkF/Hall-2-JPG.jpg",
  //   'https://i.ibb.co/vC98qMDj/Balcony-JPG.jpg',
  //   'https://i.ibb.co/kVTFDQ7J/r9-JPG.jpg',
    
  // ];


 
  // const [mainHero, setMainHero] = useState(heroImages[0]);

  // Fetch property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/api/properties/${id}`);
        setProperty(res.data);
        console.log(res.data)
        setMainHero(res.data.images[0]);
        setLoading(false);
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
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);

  if (d2 <= d1) {
    alert("Check-out must be after check-in date");
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

  if (loading) {
  return (
    <div className="stay-luxe-container">

      {/* HERO SKELETON */}
      <div className="luxe-hero">
        <Skeleton height={420} />

        <div className="hero-text">
          <Skeleton width={200} height={15} />
          <Skeleton width={300} height={35} />
          <Skeleton width={180} height={18} />
        </div>

        <div className="hero-swatches">
          <Skeleton circle width={60} height={60} />
          <Skeleton circle width={60} height={60} />
          <Skeleton circle width={60} height={60} />
        </div>
      </div>

      {/* BODY */}
      <div className="luxe-body">

        {/* LEFT SIDE */}
        <div className="left-side">

          {/* OVERVIEW */}
          <section className="overview-section">
            <Skeleton width={120} height={12} />
            <Skeleton width={350} height={40} />

            <div style={{marginTop:"20px"}}>
              <Skeleton count={3} height={18} />
            </div>

            <div style={{marginTop:"30px"}}>
              <Skeleton count={3} height={18} />
            </div>
          </section>

          {/* AMENITIES */}
          <section className="amenities-section">

            <Skeleton width={120} height={12} />
            <Skeleton width={220} height={30} />

            <div style={{marginTop:"30px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px"}}>

              {Array(8).fill().map((_,i)=>(
                <div key={i} style={{display:"flex", gap:"12px", alignItems:"center"}}>
                  <Skeleton circle width={40} height={40}/>
                  <div style={{flex:1}}>
                    <Skeleton width="80%" height={16}/>
                    <Skeleton width="60%" height={12}/>
                  </div>
                </div>
              ))}

            </div>

          </section>

        </div>

        {/* RIGHT SIDE BOOKING BOX */}
        <div className="right-side">

          <div className="booking-box">

            <Skeleton width={200} height={25}/>
            <Skeleton width={150} height={15}/>

            <div style={{marginTop:"20px"}}>
              <Skeleton height={40}/>
            </div>

            <div style={{display:"flex", gap:"10px", marginTop:"15px"}}>
              <Skeleton height={40}/>
              <Skeleton height={40}/>
            </div>

            <div style={{marginTop:"25px"}}>
              <Skeleton height={18}/>
              <Skeleton height={18}/>
              <Skeleton height={18}/>
            </div>

            <div style={{marginTop:"25px"}}>
              <Skeleton height={45}/>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

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
          {property?.images?.map((img, i) => (
            <div
              key={i}
              className={`swatch ${mainHero === img ? "active" : ""}`}
              onClick={() => setMainHero(img)}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>

     
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

          {/* rule section  */}


      <section className="rules-sections">
      <p className="sec-label">House Rules</p>
      <h2 className="sec-title">
        Good to <em>Know</em>
      </h2>

                  <div className="title-underline"></div>

      <div className="thin-rule"></div>

      <div className="rules-grid">

        <div className="rule-item">
          <div className="rule-icon">🕐</div>
          <div>
            <div className="rule-title">Check-in & Check-out</div>
            <div className="rule-detail">
              Check-in from 12:30 PM · Check-out by 10:30 PM. Early check-in and
              late check-out available on request, subject to availability.
            </div>
          </div>
        </div>

        <div className="rule-item">
          <div className="rule-icon">🚭</div>
          <div>
            <div className="rule-title">No Smoking Policy</div>
            <div className="rule-detail">
              Smoking is strictly not permitted inside the apartment to
              maintain a fresh and comfortable environment for all guests.
            </div>
          </div>
        </div>

        <div className="rule-item">
          <div className="rule-icon">🐾</div>
          <div>
            <div className="rule-title">Pets</div>
            <div className="rule-detail">
              Pets are not permitted on the property.
            </div>
          </div>
        </div>

        <div className="rule-item">
          <div className="rule-icon">👶</div>
          <div>
            <div className="rule-title">Age Requirement</div>
            <div className="rule-detail">
              Guests must be 18 years or older to book the stay. The apartment
              accommodates a maximum of 2 registered guests.
            </div>
          </div>
        </div>

        <div className="rule-item">
          <div className="rule-icon">🎉</div>
          <div>
            <div className="rule-title">Noise & Gatherings</div>
            <div className="rule-detail">
              No parties or events allowed. Please avoid loud noise after 11 PM
              to respect neighbors and maintain a peaceful atmosphere.
            </div>
          </div>
        </div>

        <div className="rule-item">
          <div className="rule-icon">🧾</div>
          <div>
            <div className="rule-title">Guest Registration</div>
            <div className="rule-detail">
              Only registered guests are permitted to stay overnight. Valid ID
              may be required at check-in.
            </div>
          </div>
        </div>

        <div className="rule-item">
          <div className="rule-icon">💳</div>
          <div>
            <div className="rule-title">Payment & Cancellation</div>
            <div className="rule-detail">
              Booking confirmation is subject to payment terms. Cancellation
              policies vary depending on the selected rate — please review at
              the time of booking.
            </div>
          </div>
        </div>

      </div>

      <div className="rules-note">
        For special requests, accessibility requirements, or any questions
        about your stay, please contact our guest relations team at{" "}
        <strong>booking@luxlettings.in</strong> or call{" "}
        <strong>+91 92179 79009</strong>. We are delighted to assist.
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
  min={new Date().toISOString().split("T")[0]}
  onChange={(e) => setCheckIn(e.target.value)}
/>
              </div>

              <div className="date-col">
                <label className="input-label">CHECK-OUT</label>
                <input
  type="date"
  value={checkOut}
  min={
    checkIn
      ? new Date(new Date(checkIn).getTime() + 86400000)
          .toISOString()
          .split("T")[0]
      : ""
  }
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