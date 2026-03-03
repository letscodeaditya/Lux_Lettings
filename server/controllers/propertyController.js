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
  const prop = await Property.create(req.body);
  res.json(prop);
};

export const deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
