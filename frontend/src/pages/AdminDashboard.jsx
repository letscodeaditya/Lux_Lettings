import { useState } from "react";
import api from "../api/axios.js";
import "./AdminDashboard.css";

export default function CreateProperty() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    capacity: "",
  });

  const [msg, setMsg] = useState("");
  const [nearbyAttractions, setNearbyAttractions] = useState([]);
  const [nearbyInput, setNearbyInput] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // SEND PURE JSON (NOT FormData)
      const body = {
        name: form.name,
        location: form.location,
        price: Number(form.price),
        description: form.description,
        capacity: Number(form.capacity),
        nearby: nearbyAttractions, // already an array
      };

      const res = await api.post("/api/properties", body);

      setMsg("Property created successfully!");

      // reset form
      setForm({
        name: "",
        location: "",
        price: "",
        description: "",
        capacity: "",
      });
      setNearbyAttractions([]);
    } catch (err) {
      console.error(err);
      setMsg("Failed to create property");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="create-property-form">
        <h2>Create New Property</h2>

        {msg && <p className="message">{msg}</p>}

        <form onSubmit={handleSubmit}>

          <label>Property Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <label>Price per Night (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          <label>Nearby Attractions</label>
          <div className="nearby-box">
            <input
              type="text"
              value={nearbyInput}
              onChange={(e) => setNearbyInput(e.target.value)}
              placeholder="Add nearby place"
            />
            <button
              type="button"
              className="add-btn"
              onClick={() => {
                if (nearbyInput.trim() !== "") {
                  setNearbyAttractions([...nearbyAttractions, nearbyInput]);
                  setNearbyInput("");
                }
              }}
            >
              Add
            </button>
          </div>

          <ul className="nearby-list">
            {nearbyAttractions.map((item, index) => (
              <li key={index}>
                {item}
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() =>
                    setNearbyAttractions(
                      nearbyAttractions.filter((_, i) => i !== index)
                    )
                  }
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <label>Guest Capacity</label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            required
          />

          <button type="submit" className="create-btn">
            Create Property
          </button>
        </form>
      </div>
    </div>
  );
}