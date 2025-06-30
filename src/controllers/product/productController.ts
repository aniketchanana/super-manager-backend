import { ERole } from '@/config/constant';
import { Organization } from '@/models/Organization';
import { Product } from '@/models/Product';
import { generateShortId } from '@/utils/app.utils';
import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      costPrice,
      minRetailPrice,
      maxRetailPrice,
      quantity,
      productDescription,
      imageUrl,
    } = req.body;
    if (
      !productName ||
      !costPrice ||
      !minRetailPrice ||
      !maxRetailPrice ||
      !quantity
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Required fields are productName, costPrice, minRetailPrice, maxRetailPrice, quantity',
      });
    }
    const organization = await Organization.findOne({
      admin: req.user._id,
    });
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found',
      });
    }
    const product = await Product.create({
      productName,
      costPrice,
      minRetailPrice,
      maxRetailPrice,
      shortId: generateShortId(),
      quantity,
      productDescription: productDescription || '',
      imageUrl: imageUrl || '',
      organizationId: organization?._id,
      createdBy: req.user.id,
    });
    product.save();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      costPrice,
      minRetailPrice,
      maxRetailPrice,
      quantity,
      productDescription,
      imageUrl,
    } = req.body;
    const product = await Product.findByIdAndUpdate(productId, {
      productName,
      costPrice,
      minRetailPrice,
      maxRetailPrice,
      quantity,
      productDescription: productDescription || '',
      imageUrl: imageUrl || '',
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: (error as Error).message,
    });
  }
};
export const getProducts = async (req: Request, res: Response) => {
  try {
    const organizationId =
      req.user.role === ERole.ADMIN
        ? (await Organization.findOne({ admin: req.user._id }))?._id
        : req.user.organization;
    const products = await Product.find({
      organizationId,
      isDeleted: false,
    }).select(`${req.user.role !== ERole.ADMIN ? '-costPrice' : ''}`);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get products',
      products: [],
      error: (error as Error).message,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({
      _id: productId,
      isDeleted: false,
    }).select(`${req.user.role !== ERole.ADMIN ? '-costPrice' : ''}`);
    res.status(200).json(product || null);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get product',
      error: (error as Error).message,
    });
  }
};

export const markProductAsSold = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (existingProduct.quantity === 0) {
      return res.status(400).json({
        success: false,
        message: 'Product is out of stock',
      });
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        quantity: existingProduct.quantity - 1,
      },
      { new: true }
    );

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to mark product as sold',
      error: (error as Error).message,
    });
  }
};
