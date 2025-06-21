import { ChildAccount } from '@/models/ChildAccount';
import { Organization } from '@/models/Organization';
import { generateToken, hashPassword } from '@/utils/app.utils';
import { Request, Response } from 'express';
import isEmpty from 'lodash/isEmpty';

const createOrg = async (req: Request, res: Response) => {
  try {
    const { name, orgId } = req.body;
    const existingOrg = await Organization.findOne({
      $or: [{ orgId }, { admin: req.user._id }],
    });
    if (existingOrg) {
      return res.status(400).json({ message: 'Organization already exists' });
    }
    if (isEmpty(name) || isEmpty(orgId)) {
      return res.status(400).json({ message: 'Name and orgId are required' });
    }
    const org = new Organization({
      name,
      orgId,
      admin: req.user._id,
      members: [],
    });
    await org.save();
    return res.status(201).json(org);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, unable to create org' });
  }
};

const getOrg = async (req: Request, res: Response) => {
  try {
    const org = await Organization.findOne({
      admin: req.user._id,
    });
    return res.status(200).json(isEmpty(org) ? null : org);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, unable to get org' });
  }
};

const updateOrg = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const org = await Organization.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!org) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    return res.status(200).json(org);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, unable to update org' });
  }
};

const addNewMemberToOrg = async (req: Request, res: Response) => {
  try {
    const { member, organizationId } = req.body;

    const token = generateToken(member.email);
    const childAccount = await ChildAccount.create({
      name: member.name,
      email: member.email,
      password: member.password,
      phoneNumber: member.phoneNumber,
      address: member.address,
      parentAccount: req.user._id,
      organization: organizationId,
      role: member.role,
      token,
      isActive: true,
    });
    await childAccount.save();
    const org = await Organization.findByIdAndUpdate(
      organizationId,
      { $push: { members: childAccount._id } },
      { new: true }
    );
    return res.status(200).json({ org, childAccount });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, unable to add member' });
  }
};

const getAllOrgMembers = async (req: Request, res: Response) => {
  try {
    const members = await ChildAccount.find({
      organization: req.params.orgId,
    }).select('-password -token');
    return res.status(200).json(members);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, unable to get all org members' });
  }
};

const deactivateMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.body;
    const updatedMember = await ChildAccount.findByIdAndUpdate(
      memberId,
      { isActive: false },
      { new: true }
    );
    return res.status(200).json(updatedMember);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, unable to deactivate member' });
  }
};

const updateOrgMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const updates = req.body;
    if (updates.password) {
      updates.password = await hashPassword(updates.password);
    }
    const updatedMember = await ChildAccount.findByIdAndUpdate(
      memberId,
      updates,
      { new: true }
    ).select('-password -token');
    return res.status(200).json(updatedMember);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, unable to update member' });
  }
};

export {
  addNewMemberToOrg,
  createOrg,
  deactivateMember,
  getAllOrgMembers,
  getOrg,
  updateOrg,
  updateOrgMember,
};
