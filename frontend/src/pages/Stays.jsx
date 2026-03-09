import { useState, useEffect } from "react";
import api from "../api/axios";
import StayCard from "../components/StayCard";
import "./Stays.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function Stays() {
  const [properties, setProperties] = useState([]);
  const [filterCity, setFilterCity] = useState("all");
  const [loading, setLoading] = useState(true);

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
  }finally {

  setLoading(false);

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

          {/* <select
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
          </select> */}
        </div>

  <div className="stays-list">

  {loading ? (

    Array(4).fill(0).map((_, index) => (
      <div key={index} className="stay-skeleton-card">

        {/* <Skeleton height={260} /> */}

        <div style={{padding:"10px 90px"}}>
          <Skeleton width="60%" height={40}/>
          <Skeleton width="40%" height={15}/>
          <Skeleton width="30%" height={15}/>
        </div>

      </div>
    ))

 ) : currentStays.length === 0 ? (

  <div className="no-property">
    
    <svg
      width="160"
      height="160"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="no-property-icon"
    >
      <path
        d="M3 10L12 3L21 10V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V10Z"
        stroke="#c4967a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21V12H15V21"
        stroke="#c4967a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <h3>No Properties Available</h3>
    <p>
      We couldn’t find any stays right now. Please check back later.
    </p>

  </div>

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