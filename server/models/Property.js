import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String
  },

  capacity: {
    type: Number
  },

  nearby: [
    {
      type: String
    }
  ],

  images: [
    {
      type: String
    }
  ]

}, { timestamps: true });

export default mongoose.model("Property", propertySchema);