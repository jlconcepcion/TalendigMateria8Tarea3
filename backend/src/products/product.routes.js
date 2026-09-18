import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from './product.controller.js';
import { productSchema } from './product.schema.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateToken, validateSchema(productSchema), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', validateSchema(productSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
