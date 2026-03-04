import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },

  capacity: { type: Number, required: true },

  nearby: {
    type: [String],   // array of strings
    required: true,
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Property', propertySchema);