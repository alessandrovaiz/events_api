import { Router } from 'express';
import AuthController from '../controllers/authController';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import batchRoutes from './batchRoutes';
import eventRoutes from './eventRoutes';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(batchRoutes);
router.use(eventRoutes);

export default router;
