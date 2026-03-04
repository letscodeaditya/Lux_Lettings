import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import tempAdminRoute from './routes/tempAdminRoute.js';
import propertyRoutes from './routes/propertyRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import auth from './routes/auth.js';
import bookingRoutes from'./routes/bookingRoutes.js';

dotenv.config();
const port = 3010;

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/login', auth);
app.use('/api/properties', propertyRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/temp', tempAdminRoute);
app.use('/api/booking', bookingRoutes);

app.listen(port, () => console.log(`Server running http://localhost:${port}`));
