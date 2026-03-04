import express from "express";
import Booking from "../models/Booking.js";
import { check } from "../controllers/bookingController.js";


const router = express.Router();

router.post("/check-availability",check);

    
export default router;