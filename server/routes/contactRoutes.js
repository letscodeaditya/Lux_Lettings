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

router.get("/all", async (req, res) => {
   try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments();

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

export default router;