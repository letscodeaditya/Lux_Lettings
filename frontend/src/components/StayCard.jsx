// components/StayCard.jsx
import React from "react";
import { useParams,useNavigate } from 'react-router-dom';



export default function StayCard({ property }) {
 const navigate = useNavigate();
 const id = property._id;
  return (
    <div className="property-container">

      <div className="property-image">
        <img src={property.image} alt={property.Images} />
      </div>

      <div className="property-info">
        <span className="property-location">{property.city}</span>

        <h1 className="property-title">
          The <br />
          <span>{property.name.replace("The ", "")}</span>
        </h1>

        <p className="property-description">{property.description}</p>

        <div className="property-tags">
          {property.nearby?.map((tag, i) => (
            <span key={i} className="tag">• {tag}</span>
          ))}
        </div>

        <div className="property-price">
          <p>PER NIGHT</p>
          <h2>₹ {property.price}</h2>
        </div>

        <div className="property-buttons">
          
          <button className="book-btn" onClick={() => navigate(`/stays/${id}`)}>BOOK NOW</button>
        </div>
      </div>

    </div>
  );
}