import express from 'express';
import {
  getAllProperties,
  getProperty,
  createProperty,
  deleteProperty,
  updateProperty,
} from '../controllers/propertyController.js';

const router = express.Router();

router.get('/all', getAllProperties);
router.get('/:id', getProperty);
router.post('/', createProperty);
router.delete('/delete/:id', deleteProperty);
router.put("/:id", updateProperty);


export default router;
