import express from 'express';
import {
  getAllProperties,
  getProperty,
  createProperty,
  deleteProperty,
} from '../controllers/propertyController.js';

const router = express.Router();

router.get('/all', getAllProperties);
router.get('/:id', getProperty);
router.post('/', createProperty);
router.delete('/:id', deleteProperty);


export default router;
