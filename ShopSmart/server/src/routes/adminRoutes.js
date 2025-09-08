import express from 'express';
import {
  getDashboard,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  updateOrderStatus,
  getUsers,
  updateUserRole,
} from '../controllers/adminController.js';
import { protect, admin } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createProductSchema, updateProductSchema } from '../validation/productValidation.js';
import { updateStatusSchema } from '../validation/orderValidation.js';

const router = express.Router();

router.use(protect, admin); // JWT + role guard

/* dashboard */
router.get('/dashboard', getDashboard);

/* products */
router.get('/products', getAdminProducts);
router.post('/products', validate(createProductSchema), createProduct);
router.put('/products/:id', validate(updateProductSchema), updateProduct);
router.delete('/products/:id', deleteProduct);

/* orders */
router.get('/orders', getAdminOrders);
router.put('/orders/:id/status', validate(updateStatusSchema), updateOrderStatus);

/* users */
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);

export default router;
