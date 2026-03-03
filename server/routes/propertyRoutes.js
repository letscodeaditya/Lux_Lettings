import express from 'express';
import {
  getAllProperties,
  getProperty,
  createProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
// import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getAllProperties);
router.get('/:id', getProperty);
router.post('/', createProperty);
router.delete('/:id', deleteProperty);
// router.post('/', adminAuth, createProperty);
// router.delete('/:id', adminAuth, deleteProperty);

export default router;
