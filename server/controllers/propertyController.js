import Property from '../models/Property.js';

export const getAllProperties = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const skip = (page - 1) * limit;

    const total = await Property.countDocuments();

    const properties = await Property.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching properties",
    });
  }
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
      nearby,
      images   // 👈 receive images array
    } = req.body;

    const property = new Property({
      name,
      location,
      price,
      description,
      capacity,
      nearby,
      images   // 👈 store images
    });

    await property.save();

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property
    });

  } catch (err) {

    console.error("Create Property Error:", err);

    res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }
};

export const deleteProperty = async (req, res) => {
  try {

    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await Property.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (error) {

    console.error("Delete property error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting property",
    });

  }
};

export const updateProperty = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      location,
      price,
      description,
      capacity,
      nearby,
      images
    } = req.body;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    property.name = name || property.name;
    property.location = location || property.location;
    property.price = price || property.price;
    property.description = description || property.description;
    property.capacity = capacity || property.capacity;
    property.nearby = nearby || property.nearby;
    property.images = images || property.images;

    const updatedProperty = await property.save();

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty
    });

  } catch (error) {

    console.error("Update property error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating property"
    });

  }
};
