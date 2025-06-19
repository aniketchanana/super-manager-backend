import config from '@/config/config';
import jwt from 'jsonwebtoken';

export const generateToken = (email: string): string => {
  return jwt.sign({ email }, config.jwtSecret as jwt.Secret, {
    expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });
};
