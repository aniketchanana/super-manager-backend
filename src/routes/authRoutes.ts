import authEndpoints from '@/config/apiEndpoints';
import { getProfile, login, registerAdmin } from '@/controllers/authController';
import { protect } from '@/middleware/auth';
import express from 'express';

const router = express.Router();

router.post(authEndpoints.register, registerAdmin);
router.post(authEndpoints.login, login);
router.get(authEndpoints.profile, protect, getProfile);

export default router;
