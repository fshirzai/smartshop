import express from 'express';
import { createOrder, getMyOrders, getOrderById, markPaid } from '../controllers/orderController.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createOrderSchema } from '../validation/orderValidation.js';

const router = express.Router();

router.use(protect); // everything below needs login

router.post('/', validate(createOrderSchema), createOrder);
router.get('/my', getMyOrders);
router.get('/:id', getOrderById);
router.put('/:id/pay', markPaid);

export default router;
