import {Router} from 'express';
import batchController from '../controllers/batchController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/batches', authMiddleware, batchController.fetch);

router.get('/batches/:batchId', authMiddleware, batchController.index);

router.post('/batches', authMiddleware, batchController.store);

router.put('/batches/:batchId', authMiddleware, batchController.update);

router.delete('/batches/:batchId', authMiddleware, batchController.delete);

export default router;