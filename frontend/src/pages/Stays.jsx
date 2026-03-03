import { useState } from 'react';
import './Stays.css';

export default function Stays() {
  const properties = [
    {
      id: 1,
      title: 'The Boutique Stay',
      subtitle: 'Urban Retreat',
      city: 'Noida, Uttar Pradesh',
      description:
        'A calm, design-led studio crafted for modern living — peacefully located, yet effortlessly connected to the city’s essentials.',
      features: [
        'Private Studio',
        'High-Speed WiFi',
        'Work-Friendly',
        'Quiet Location',
      ],
      price: '18,000',
      image: '/images/stay1.jpg',
    },
  ];

  const [index, setIndex] = useState(0);
  const [filterCity, setFilterCity] = useState('all');

  const filtered =
    filterCity === 'all'
      ? properties
      : properties.filter((p) => p.city.includes(filterCity));

  const current = filtered[index] || properties[0];

  const next = () => {
    setIndex((prev) => (prev + 1) % filtered.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="breadcrumb">
            <a href="#">Home</a>›<span>Stays</span>
          </div>

          <h1>
            Our <em>Stays</em>
          </h1>

          <div className="page-hero-meta">
            <span className="meta-pill">India</span>
          </div>
        </div>
      </div>

      <div className="stays-page">
        {/* Top Bar */}

        <div className="stays-filter-bar">
          <button className="active-tab">ALL STAYS</button>

          <select
            className="city-dropdown"
            onChange={(e) => {
              setFilterCity(e.target.value);
              setIndex(0);
            }}
          >
            <option value="all">Filter by City</option>
            <option value="Noida">Noida</option>
          </select>
        </div>

        {/* Navigation Arrows */}
        <button className="nav-arrow left" onClick={prev}>
          ❮
        </button>
        <button className="nav-arrow right" onClick={next}>
          ❯
        </button>

        {/* Main Content */}
        <div className="property-container">
          <div className="property-image">
            <img src={current.image} alt={current.title} />
          </div>

          <div className="property-info">
            <span className="property-index">0{index + 1}</span>

            <span className="property-location">{current.city}</span>

            <h1 className="property-title">
              The <br />
              <span>{current.title.replace('The ', '')}</span>
            </h1>

            <p className="property-description">{current.description}</p>

            <div className="property-tags">
              {current.features.map((tag, i) => (
                <span key={i} className="tag">
                  • {tag}
                </span>
              ))}
            </div>

            <div className="property-price">
              <p>PER NIGHT</p>
              <h2>₹ {current.price}</h2>
            </div>

            <div className="property-buttons">
              <button className="details-btn">VIEW DETAILS</button>
              <button className="book-btn">BOOK NOW</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
