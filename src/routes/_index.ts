import { Router } from 'express';
import AuthController from '../controllers/authController';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);

export default router;
