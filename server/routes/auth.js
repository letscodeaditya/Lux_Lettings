import express from 'express';
import { Login } from '../controllers/adminController.js';

const router = express.Router();

router.get('/admin', Login);

export default router;
