import { ERole } from '@/config/constant';
import { IUser } from '@/models/User';
import { hashPassword } from '@/utils/app.utils';
import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

export interface IChildAccount extends Document, IUser {
  parentAccount: mongoose.Types.ObjectId;
  organization: mongoose.Types.ObjectId;
  phoneNumber: string;
  address: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const childAccountSchema = new Schema<IChildAccount>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentAccount: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    role: {
      type: String,
      default: ERole.SALES,
    },
    token: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
childAccountSchema.index({ parentAccount: 1 });
childAccountSchema.index({ organization: 1 });

// Hash password before saving
childAccountSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error: unknown) {
    next(error as Error);
  }
});

// Compare password method
childAccountSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const ChildAccount = mongoose.model<IChildAccount>(
  'ChildAccount',
  childAccountSchema
);
