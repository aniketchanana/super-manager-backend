import { authEndpoints } from '@/config/apiEndpoints';
import {
  getProfile,
  login,
  loginChildAccount,
  logout,
  logoutChildAccount,
  registerAdmin,
} from '@/controllers/auth/authController';
import { protectAdmin, protectChildAccount } from '@/middleware/auth';
import express from 'express';

const router = express.Router();

router.post(authEndpoints.register, registerAdmin);
router.post(authEndpoints.login, login);
router.get(authEndpoints.profile, protectAdmin, getProfile);
router.post(authEndpoints.logout, protectAdmin, logout);
router.post(authEndpoints.loginChildAccount, loginChildAccount);
router.post(
  authEndpoints.logoutChildAccount,
  protectChildAccount,
  logoutChildAccount
);

export default router;
