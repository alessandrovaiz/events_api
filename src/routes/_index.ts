import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import batchRoutes from './batchRoutes';
import eventRoutes from './eventRoutes';
import companyRoutes from './companyRoutes';
import addressRoutes from './addressRoutes';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(batchRoutes);
router.use(eventRoutes);
router.use(companyRoutes);
router.use(addressRoutes);

export default router;
