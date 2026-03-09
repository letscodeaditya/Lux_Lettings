import { useState } from "react";
import api from "../api/axios";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    property: "",
    enquiryType: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/api/contact/query", formData);

    alert("Message sent successfully!");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      property: "",
      enquiryType: "",
      message: "",
    });

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
  return (
    <div className="contact-page">

      {/* ========================= HERO SECTION ========================= */}
      <section className="contact-hero">
        <div className="contact-hero-grid"></div>

        <div className="contact-hero-content">
          <p className="breadcrumb">HOME › CONTACT</p>
          <p className="hero-mini">GET IN TOUCH</p>

          <h1 className="contact-title">
            We'd Love to <br />
            <em>Hear From You</em>
          </h1>
        </div>
      </section>

      {/* ========================= CONTACT FORM SECTION ========================= */}
      <section className="contact-section">

        {/* LEFT SIDE FORM */}
        <div className="contact-form-wrap">
          <p className="section-tag">SEND A MESSAGE</p>

          <h2 className="form-title">
            How Can We <br />
            <em>Assist You?</em>
          </h2>

          <p className="form-desc">
            Whether you're planning a stay, enquiring about an event,
            or simply wish to say hello — our team is ready to respond within an hour.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="row">
              <div className="field">
                <label>FIRST NAME *</label>
                <input
  name="firstName"
  value={formData.firstName}
  onChange={handleChange}
  type="text"
  placeholder="Your first name"
/>
              </div>

              <div className="field">
                <label>LAST NAME *</label>
                <input
  name="lastName"
  value={formData.lastName}
  onChange={handleChange}
  type="text"
  placeholder="Your last name"
/>
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>EMAIL ADDRESS *</label>
               <input
  name="email"
  value={formData.email}
  onChange={handleChange}
  type="email"
  placeholder="your@email.com"
/>
              </div>

              <div className="field">
                <label>PHONE NUMBER</label>
                <input
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  type="text"
  placeholder="+91 or +44"
/>
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>PROPERTY</label>
               <select
  name="property"
  value={formData.property}
  onChange={handleChange}
>
  <option value="">Select a property</option>
  <option value="Garden Retreat">Garden Retreat</option>
  <option value="Boutique Stay">Boutique Stay</option>
  <option value="Urban Studio">Urban Studio</option>
</select>
              </div>

              <div className="field">
                <label>ENQUIRY TYPE</label>
                <select
  name="enquiryType"
  value={formData.enquiryType}
  onChange={handleChange}
>
  <option value="">Select type</option>
  <option value="Booking">Booking</option>
  <option value="Event">Event</option>
  <option value="General Query">General Query</option>
</select>
              </div>
            </div>

            <div className="field">
              <label>YOUR MESSAGE *</label>
             <textarea
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="Tell us how we can help..."
></textarea>
            </div>

            <button className="send-btn">SEND MESSAGE</button>

            <p className="privacy-note">
              We respond within an hour during office hours.
              Your details are kept strictly private.
            </p>
          </form>
        </div>

        {/* ================= RIGHT SIDE INFO ================= */}
        <div className="contact-info">

          <div className="info-card">
            <h4>TELEPHONE</h4>
            <p className="info-title">Call Us Directly</p>
            <p>India: <a href="tel:+919217979009">+91 92179 79009</a></p>
          </div>

          <div className="info-card">
            <h4>EMAIL</h4>
            <p className="info-title">Write to Us</p>
            <p>Enquiry: bookings@luxlettings.in</p>
            <p>General: luxlettings30@gmail.com</p>
          </div>

          <div className="info-card">
            <h4>OFFICE</h4>
            <p className="info-title">Lux Lettings</p>
            <p>Noida, Uttar Pradesh</p>
            <p>India</p>
          </div>
        </div>
      </section>

      {/* ========================= HOURS SECTION ========================= */}
      <section className="hours-section">
        <h3>Guest Relations Hours</h3>

        <div className="hours-row">
          <span>Monday — Friday</span>
          <span>9:00 AM — 8:00 PM</span>
        </div>

        <div className="hours-row">
          <span>Saturday</span>
          <span>10:00 AM — 6:00 PM</span>
        </div>

        <div className="hours-row">
          <span>Sunday</span>
          <span>11:00 AM — 4:00 PM</span>
        </div>

        <p className="note">● OUTSIDE OFFICE HOURS</p>
      </section>

    </div>
  );
}