import {Router} from 'express';
import ticketController from '../controllers/ticketController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/tickets', authMiddleware, ticketController.fetch);

router.get('/tickets/:ticketId', authMiddleware, ticketController.index);

router.post('/tickets', authMiddleware, ticketController.store);

router.put('/tickets/:ticketId', authMiddleware, ticketController.update);

router.delete('/tickets/:ticketId', authMiddleware, ticketController.delete);

export default router;