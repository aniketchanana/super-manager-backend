import dotenv from 'dotenv';

dotenv.config();
const mongoUri = `mongodb://${process.env.MONGODB_ROOT_USERNAME}:${process.env.MONGODB_ROOT_PASSWORD}@localhost:27017/${process.env.MONGODB_DATABASE}?authSource=admin`;

export const config = {
  port: process.env.PORT,
  mongoUri,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  nodeEnv: process.env.NODE_ENV,
} as const;

export default config;
