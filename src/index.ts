import authEndpoints from '@/config/apiEndpoints';
import config from '@/config/config';
import connectDB from '@/config/database';
import authRoutes from '@/routes/authRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Routes
app.use(authEndpoints.root, authRoutes);

// Basic route
app.get('/', (_req, res) => {
  return res.json({ message: 'Welcome to Super Manager API' });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
