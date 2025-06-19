import { orgEndpoints } from '@/config/apiEndpoints';
import {
  addNewMemberToOrg,
  createOrg,
  deactivateMember,
  getOrg,
  updateOrg,
} from '@/controllers/org/organizationController';
import { protectAdmin } from '@/middleware/auth';
import express from 'express';

const router = express.Router();
router.get(orgEndpoints.get, protectAdmin, getOrg);
router.post(orgEndpoints.create, protectAdmin, createOrg);
router.patch(orgEndpoints.update, protectAdmin, updateOrg);
router.post(orgEndpoints.addMember, protectAdmin, addNewMemberToOrg);
router.post(orgEndpoints.deactivateMember, protectAdmin, deactivateMember);

export default router;
