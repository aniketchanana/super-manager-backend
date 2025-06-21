import { authEndpoints } from '@/config/apiEndpoints';
import {
  getProfile,
  login,
  loginChildAccount,
  logout,
  registerAdmin,
} from '@/controllers/auth/authController';
import { protect } from '@/middleware/auth';
import express from 'express';

const router = express.Router();

router.post(authEndpoints.register, registerAdmin);
router.post(authEndpoints.login, login);
router.get(authEndpoints.profile, protect, getProfile);
router.post(authEndpoints.logout, protect, logout);
router.post(authEndpoints.loginChildAccount, loginChildAccount);

export default router;
