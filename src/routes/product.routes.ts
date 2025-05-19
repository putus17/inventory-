import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/Product.controller'

const router = Router();

// POST /api/products - Create a new product
router.post('/', createProduct);

// GET /api/products - Get all products
router.get('/', getAllProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', getProductById);

// PUT /api/products/:id - Update product by ID
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Delete product by ID
router.delete('/:id', deleteProduct);

export default router;
