import { productEndpoints } from '@/config/apiEndpoints';
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '@/controllers/product/productController';
import { onlyForAdmin, protect } from '@/middleware/auth';
import express from 'express';

const router = express.Router();

router.post(productEndpoints.add, protect, onlyForAdmin, createProduct);
router.patch(productEndpoints.update, protect, onlyForAdmin, updateProduct);
router.get(productEndpoints.getAllProducts, protect, getProducts);
router.get(productEndpoints.getProductById, protect, getProductById);

export default router;
