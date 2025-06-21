import { ERole } from '@/config/constant';
import { ChildAccount } from '@/models/ChildAccount';
import { User } from '@/models/User';
import { generateToken } from '@/utils/app.utils';
import { type Request, type Response } from 'express';

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const token = generateToken(email, false);
    const user = await User.create({
      name,
      email,
      password,
      role: ERole.ADMIN,
      token,
    });
    await user.save();

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid user data' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(email, false);
      await user.updateOne({ token });
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const user = await (req.isChildAccount
      ? ChildAccount.findById(req.user._id)
      : User.findById(req.user._id));
    if (user) {
      await user.updateOne({ token: '' });
    }
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginChildAccount = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const childAccount = await ChildAccount.findOne({ email });
    if (
      childAccount &&
      childAccount.isActive &&
      (await childAccount.comparePassword(password))
    ) {
      const token = generateToken(email, true);
      await childAccount.updateOne({ token });
      return res.json({
        _id: childAccount._id,
        name: childAccount.name,
        email: childAccount.email,
        role: childAccount.role,
        token,
      });
    } else {
      return res
        .status(401)
        .json({ message: 'Child account:: Invalid credentials' });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Child account:: Invalid credentials' });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await (req.isChildAccount
      ? ChildAccount.findById(req.user._id)
      : User.findById(req.user._id).select('-password'));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data' });
  }
};
