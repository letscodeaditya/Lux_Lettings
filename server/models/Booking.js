import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  name: String,
  email: String,
  phone: String,
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: Number,
  amountPaid: Number,
  paymentId: String,
  orderId: String,
  status: { type: String, default: 'pending' },
});

export default mongoose.model('Booking', bookingSchema);
