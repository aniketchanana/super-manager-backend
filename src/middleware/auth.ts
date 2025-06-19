import config from '@/config/config';
import { ERole } from '@/config/constant';
import { ChildAccount } from '@/models/ChildAccount';
import { IUser, User } from '@/models/User';
import { AuthRequest } from '@/types';
import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
      return;
    }

    const decoded = jwt.verify(
      token,
      config.jwtSecret as jwt.Secret
    ) as unknown as JwtPayload;
    const user = await User.findOne({
      email: decoded.email,
      token,
    }).select('-password');

    if (!user) {
      res.status(401).json({ message: 'Not authorized, user not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
export const protectChildAccount = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
      return;
    }

    const decoded = jwt.verify(
      token,
      config.jwtSecret as jwt.Secret
    ) as unknown as JwtPayload;
    const childAccount = await ChildAccount.findOne({
      email: decoded.email,
      token,
    }).select('-password');

    if (!childAccount) {
      res.status(401).json({ message: 'Not authorized, user not found' });
      return;
    }

    req.user = childAccount as IUser;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const admin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.role === ERole.ADMIN) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};
