import { useState, useEffect } from "react";
import api from "../api/axios";
import StayCard from "../components/StayCard";
import "./Stays.css";

export default function Stays() {
  const [properties, setProperties] = useState([]);
  const [filterCity, setFilterCity] = useState("all");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const staysPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
  try {
    const res = await api.get("/api/properties/all");

    const Images = res.data.properties.map((p) => ({
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

  // filtering
  const filtered =
    filterCity === "all"
      ? properties
      : properties.filter((p) =>
          p.location?.toLowerCase().includes(filterCity.toLowerCase())
        );

  const uniqueCities = [...new Set(properties.map((p) => p.location))];

  // pagination logic
  const indexOfLastStay = currentPage * staysPerPage;
  const indexOfFirstStay = indexOfLastStay - staysPerPage;

  const currentStays = filtered.slice(indexOfFirstStay, indexOfLastStay);

  const totalPages = Math.ceil(filtered.length / staysPerPage);

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
            onChange={(e) => {
              setFilterCity(e.target.value);
              setCurrentPage(1); // reset page when filter changes
            }}
          >
            <option value="all">Filter by City</option>

            {uniqueCities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Property Cards */}
        <div className="stays-list">
          {currentStays.length === 0 ? (
            <p>No properties found</p>
          ) : (
            currentStays.map((property) => (
              <StayCard
                key={property._id || property.id}
                property={property}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-stay">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-btn ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </>
  );
}