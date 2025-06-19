import { ERole } from '@/config/constant';
import mongoose, { Document, Schema } from 'mongoose';

export interface IChildAccount extends Document {
  email: string;
  password: string;
  name: string;
  parentAccount: mongoose.Types.ObjectId;
  organization: mongoose.Types.ObjectId;
  role: ERole.SALES;
  token: string;
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

export const ChildAccount = mongoose.model<IChildAccount>(
  'ChildAccount',
  childAccountSchema
);
