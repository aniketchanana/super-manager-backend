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
import path from 'path';

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (_origin, callback) {
      callback(null, true);
    },
    credentials: true,
  })
);

app.options('*', cors());

app.use(helmet());

// Serve static files from public directory
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'public', 'uploads'))
);

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
  console.log(`Server started on port ${PORT}`);
});
