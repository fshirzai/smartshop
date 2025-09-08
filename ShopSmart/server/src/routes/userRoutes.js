import express from 'express';
import { getMe, updateMe, deleteMe, getUserById, getAllUsers } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { updateProfileSchema } from '../validation/userValidation.js';

const router = express.Router();

router.get('/me', protect, getMe);
router.put('/me', protect, validate(updateProfileSchema), updateMe);
router.delete('/me', protect, deleteMe);
router.get('/:id', getUserById);
router.get('/', getAllUsers);

export default router;
