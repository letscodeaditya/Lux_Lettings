import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/query", async (req, res) => {
  try {

    const contact = new Contact(req.body);
    await contact.save();

    res.status(200).json({
      message: "Message received successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

export default router;