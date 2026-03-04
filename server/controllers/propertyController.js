import Property from '../models/Property.js';

export const getAllProperties = async (req, res) => {
  const props = await Property.find();
  res.json(props);
};

export const getProperty = async (req, res) => {
  const prop = await Property.findById(req.params.id);
  res.json(prop);
};


export const createProperty = async (req, res) => {
  try {
    const {
      name,
      location,
      price,
      description,
      capacity,
      nearby
    } = req.body;

    const property = new Property({
      name,
      location,
      price,
      description,
      capacity,
      nearby
    });

    await property.save();

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property
    });

  } catch (err) {
    console.error("Create Property Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
