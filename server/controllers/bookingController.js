import express from "express";
import Booking from "../models/Booking.js";



// CHECK AVAILABILITY
export const check = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut } = req.body;

    const overlapping = await Booking.findOne({
      propertyId,

      // ignore cancelled bookings
      status: { $ne: "cancelled" },

      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) }
    });

    if (overlapping) {
      return res.json({ available: false });
    }

    res.json({ available: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalBookings = await Booking.countDocuments();

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      bookings,
      currentPage: page,
      totalPages: Math.ceil(totalBookings / limit),
      totalBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
};

