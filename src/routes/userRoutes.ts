import {Router} from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/users', authMiddleware, UserController.index);

router.post('/users', UserController.store);

export default router;