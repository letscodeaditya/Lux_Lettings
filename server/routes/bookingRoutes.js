import express from "express";
import Booking from "../models/Booking.js";
import { cancelBooking, check, getAllBookings } from "../controllers/bookingController.js";


const router = express.Router();

router.post("/check-availability",check);
router.get("/all", getAllBookings);
router.put("/cancel/:id", cancelBooking);

    
export default router;