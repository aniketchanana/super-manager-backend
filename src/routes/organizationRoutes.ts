import { orgEndpoints } from '@/config/apiEndpoints';
import {
  addNewMemberToOrg,
  createOrg,
  deactivateMember,
  getAllOrgMembers,
  getOrg,
  updateOrg,
  updateOrgMember,
} from '@/controllers/org/organizationController';
import { onlyForAdmin, protect } from '@/middleware/auth';
import express from 'express';

const router = express.Router();
router.get(orgEndpoints.get, protect, getOrg);
router.post(orgEndpoints.create, protect, onlyForAdmin, createOrg);
router.patch(orgEndpoints.update, protect, onlyForAdmin, updateOrg);
router.post(orgEndpoints.addMember, protect, onlyForAdmin, addNewMemberToOrg);
router.post(
  orgEndpoints.deactivateMember,
  protect,
  onlyForAdmin,
  deactivateMember
);
router.get(orgEndpoints.getAllMembers, protect, onlyForAdmin, getAllOrgMembers);
router.patch(orgEndpoints.updateMember, protect, onlyForAdmin, updateOrgMember);

export default router;
