import { ERole } from '@/config/constant';
import { ChildAccount } from '@/models/ChildAccount';
import { Organization } from '@/models/Organization';
import { generateToken } from '@/utils/app.utils';
import { Request, Response } from 'express';

const createOrg = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const org = new Organization({ name, admin: req.user._id, members: [] });
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
    const org = await Organization.find({
      admin: req.user._id,
      _id: req.params.id,
    });
    return res.status(200).json(org);
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
      parentAccount: req.user._id,
      organization: organizationId,
      role: ERole.SALES,
      token,
      isActive: true,
    });
    await childAccount.save();
    const org = await Organization.findByIdAndUpdate(
      organizationId,
      { $push: { members: childAccount._id } },
      { new: true }
    );
    return res.status(200).json(org);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, unable to add member' });
  }
};

export { addNewMemberToOrg, createOrg, getOrg, updateOrg };
