import Razorpay from 'razorpay';
import crypto from 'crypto';
import Booking from '../models/Booking.js';

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: amount * 100,
      currency: 'INR',
    });

    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingData,
  } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    const booking = await Booking.create({
      ...bookingData,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amountPaid: bookingData.amount,
      status: 'paid',
    });

    return res.json({ success: true, booking });
  }

  res.status(400).json({ success: false });
};
