import {
  authEndpoints,
  orgEndpoints,
  productEndpoints,
} from '@/config/apiEndpoints';
import config from '@/config/config';
import connectDB from '@/config/database';
import authRoutes from '@/routes/authRoutes';
import orgRoutes from '@/routes/organizationRoutes';
import productRoutes from '@/routes/productRoutes';
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

const allowedOrigins = [
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'https://super-manager-phi.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.options('*', cors());

app.use(helmet());

// Routes
app.use(authEndpoints.root, authRoutes);
app.use(orgEndpoints.root, orgRoutes);
app.use(productEndpoints.root, productRoutes);

// Basic route
app.get('/', (_req, res) => {
  return res.json({ message: 'Welcome to Super Manager API' });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
