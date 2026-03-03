import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  location: String,
  images: [String],
  description: String,
  tags: [String],
  price: Number,
  thumbnail: {
    type: String,
    required: true,
  },
  ratings: String,
  Capacity: String,
  available: Boolean,
});

export default mongoose.model('Property', propertySchema);
