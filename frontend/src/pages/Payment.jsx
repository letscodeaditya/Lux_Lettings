export default function Payment() {
  return (
    <div className="payment-page">
      <h1>Complete Your Booking</h1>

      <div className="payment-card">
        <label>Full Name</label>
        <input type="text" />

        <label>Card Number</label>
        <input type="text" />

        <label>Expiry</label>
        <input type="text" />

        <label>CVV</label>
        <input type="text" />

        <button className="btn-primary">Pay Now</button>
      </div>
    </div>
  );
}
