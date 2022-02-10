import {Router} from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/users', authMiddleware, userController.fetch);

router.get('/users/:userId', authMiddleware, userController.index);

router.post('/users', authMiddleware, userController.store);

router.put('/users/:userId', authMiddleware, userController.update);

router.delete('/users/:userId', authMiddleware, userController.delete);

export default router;