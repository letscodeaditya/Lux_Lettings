import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    
    console.log('created')
    res.json({ success: true, order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'failed'});
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      propertyId,
      name,
      email,
      phone,
      checkIn,
      checkOut,
      amount
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature"
      });
    }

    // ✅ Create booking after payment verification
    const booking = await Booking.create({
      propertyId,
      name,
      email,
      phone,
      checkIn,
      checkOut,
      amountPaid: amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "confirmed",
    });

    return res.json({
      success: true,
      bookingId: booking._id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};