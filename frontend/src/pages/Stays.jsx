import { useState, useEffect } from "react";
import api from "../api/axios";
import StayCard from "../components/StayCard";
import "./Stays.css";

export default function Stays() {
  const [properties, setProperties] = useState([]);
  const [filterCity, setFilterCity] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/properties/all");
        // You have no images yet, so manually add a fallback image
        const Images = res.data.map((p) => ({
          ...p,
          image: p.image || "https://i.ibb.co/vC98qMDj/Balcony-JPG.jpg"
        }));
        setProperties(Images);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      }
    };
    fetchData();
  }, []);

  const filtered =
    filterCity === "all"
      ? properties
      : properties.filter((p) =>
          p.location?.toLowerCase().includes(filterCity.toLowerCase())
        );

  const uniqueCities = [...new Set(properties.map((p) => p.location))];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="breadcrumb">
            <a href="#">Home</a> › <span>Stays</span>
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
        {/* Filter Bar */}
        <div className="stays-filter-bar">
          <button className="active-tab">ALL STAYS</button>

          <select
            className="city-dropdown"
            onChange={(e) => setFilterCity(e.target.value)}
          >
            <option value="all">Filter by City</option>

            {uniqueCities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Property Cards List */}
        <div className="stays-list">
          {filtered.length === 0 ? (
            <p>No properties found</p>
          ) : (
            filtered.map((property) => (
              <StayCard key={property._id || property.id} property={property} />
            ))
          )}
        </div>
      </div>
    </>
  );
}