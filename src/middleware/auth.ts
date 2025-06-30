import config from '@/config/config';
import { ERole } from '@/config/constant';
import { ChildAccount } from '@/models/ChildAccount';
import { User } from '@/models/User';
import { AuthRequest } from '@/types';
import { type NextFunction, type Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
  isChildAccount: boolean;
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
    if (!decoded.isChildAccount) {
      const user = await User.findOne({
        email: decoded.email,
        token,
      }).select('-password');
      if (!user) {
        res.status(401).json({ message: 'Not authorized, user not found' });
        return;
      }

      req.user = user;
      req.isChildAccount = false;
    } else {
      const user = await ChildAccount.findOne({
        email: decoded.email,
        token,
        isActive: true,
      }).select('-password');
      if (!user) {
        res.status(401).json({ message: 'Not authorized, user not found' });
        return;
      }

      req.user = user;
      req.isChildAccount = true;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const onlyForAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user.role !== ERole.ADMIN) {
    res.status(400).json({ message: 'This is only accessible to admin' });
    return;
  }
  next();
};
