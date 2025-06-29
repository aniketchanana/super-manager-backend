import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  costPrice: number;
  minRetailPrice: number;
  maxRetailPrice: number;
  wholeSalePrice?: number;
  quantity: number;
  productDescription?: string;
  imageUrl?: string;
  organizationId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  costPrice: { type: Number, required: true },
  minRetailPrice: { type: Number, required: true },
  maxRetailPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  wholeSalePrice: { type: Number, required: false },
  productDescription: { type: String, required: false },
  imageUrl: { type: String, required: false },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
