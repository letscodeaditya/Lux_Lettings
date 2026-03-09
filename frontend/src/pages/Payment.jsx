import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Payment.css";

export default function Payment() {
  const { id, start, end, nights, amount } = useParams();
  const navigate = useNavigate();

  const [guest, setGuest] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });

  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await api.get(`/api/properties/${id}`);
      setProperty(res.data);
    };
    fetchProperty();
  }, [id]);

  // HANDLE PAYMENT
 const handlePay = async () => {
  if (!guest.name || !guest.email || !guest.phone || !guest.country) {
    alert("Please fill all required fields");
    return;
  }

  try {
    // CREATE ORDER
    const orderRes = await api.post("/api/payments/order", {
      amount,
    });

    const { order } = orderRes.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      description: "Booking Payment",

      handler: async function (response) {
        try {
          const verifyRes = await api.post("/api/payments/verify", {
            ...response,
            propertyId: property._id,
            name: guest.name,
            email: guest.email,
            phone: guest.phone,
            checkIn: start,
            checkOut: end,
            amount,
          });

          if (verifyRes.data.success) {
            navigate("/booking-success", {
              state: {
                guest_name: guest.name,
                guest_email: guest.email,
                guest_phone: guest.phone,
                property: property.name,
                property_id: id,
                booking_id: verifyRes.data.bookingId,
                checkIn: start,
                checkOut: end,
                amount,
              },
            });
          } else {
            alert("Payment verification failed");
          }
        } catch (err) {
          console.error(err);
          alert("Verification error");
        }
      },

      prefill: {
        name: guest.name,
        email: guest.email,
        contact: guest.phone,
      },

      theme: {
        color: "#8B5E3C",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Payment initialization failed");
  }
};

  if (!property) return <p>Loading...</p>;

  return (
    <div className="payment-container">

      {/* LEFT SIDE FORM */}
      <div className="payment-left">

        <div className="section-box">
          <h3 className="section-title">
            <span className="section-num">1</span> Guest Details
          </h3>

          <div className="grid-2">
            <input
              placeholder="Name"
              onChange={(e) => setGuest({ ...guest, name: e.target.value })}
            />
          </div>

          <div className="grid-2">
            <input
              placeholder="Email Address"
              onChange={(e) => setGuest({ ...guest, email: e.target.value })}
            />
            <input
              placeholder="Phone Number"
              onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
            />
          </div>

         <select
  value={guest.country}
  onChange={(e) => setGuest({ ...guest, country: e.target.value })}
>
  <option value="">Select Country</option>
  <option value="India">India</option>
  <option value="USA">USA</option>
  <option value="UK">UK</option>
  <option value="Australia">Australia</option>
</select>
        </div>

        {/* PAYMENT DETAILS */}
        <div className="section-box">
          <h3 className="section-title">
            <span className="section-num">2</span> Pay Now
          </h3>

          <button className="pay-btn" onClick={handlePay}>
            PAY ₹{amount}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE SUMMARY */}
      <div className="payment-right">

        <div className="summary-box">
          

          <h2 className="summary-title">{property.name}</h2>
          <p className="summary-location">{property.location}</p>

          <div className="summary-dates">
            <div>
              <p className="label">Check-in</p>
              <p>{start}</p>
            </div>

            <div>
              <p className="label">Check-out</p>
              <p>{end}</p>
            </div>
          </div>

          <div className="summary-pricing">
            <p>₹{property.price} × {nights} nights</p>
            <p>₹{property.price * nights}</p>

            <p>Taxes & fees (18%)</p>
            <p>₹{Math.round(amount - property.price * nights)}</p>

            <hr />

            <h3>Total</h3>
            <h2 className="summary-total">₹{amount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}