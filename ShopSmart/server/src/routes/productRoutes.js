import express from 'express';
import {
  getProducts,
  getProduct,
  getFeatured,
  createReview,
} from '../controllers/productController.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { reviewSchema } from '../validation/reviewValidation.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeatured);
router.get('/:id', getProduct);
router.post('/:id/reviews', protect, validate(reviewSchema), createReview);

export default router;
