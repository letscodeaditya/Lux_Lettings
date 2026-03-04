import express from "express";
import Booking from "../models/Booking.js";



// CHECK AVAILABILITY
export const check = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut } = req.body;

    const overlapping = await Booking.findOne({
      propertyId,
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

