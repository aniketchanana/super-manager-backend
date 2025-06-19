import { orgEndpoints } from '@/config/apiEndpoints';
import {
  addNewMemberToOrg,
  createOrg,
  getOrg,
  updateOrg,
} from '@/controllers/org/organizationController';
import { admin, protect } from '@/middleware/auth';
import express from 'express';

const router = express.Router();
router.get(orgEndpoints.get, protect, admin, getOrg);
router.post(orgEndpoints.create, protect, admin, createOrg);
router.patch(orgEndpoints.update, protect, admin, updateOrg);
router.post(orgEndpoints.addMember, protect, admin, addNewMemberToOrg);

export default router;
