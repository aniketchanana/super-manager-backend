import config from '@/config/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const generateToken = (email: string): string => {
  return jwt.sign({ email }, config.jwtSecret as jwt.Secret, {
    expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
