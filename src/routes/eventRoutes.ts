import {Router} from 'express';
import eventController from '../controllers/eventController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/events', authMiddleware, eventController.fetch);

router.get('/events/:eventId', authMiddleware, eventController.index);

router.post('/events', authMiddleware, eventController.store);

router.put('/events/:eventId', authMiddleware, eventController.update);

router.delete('/events/:eventId', authMiddleware, eventController.delete);

export default router;