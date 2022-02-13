import {Router} from 'express';
import userTicketsController from '../controllers/userTicketsController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/user-tickets/:userId', authMiddleware, userTicketsController.fetchUserTicketsByUserId);

router.get('/user-tickets/purchase/:userTicketId', authMiddleware, userTicketsController.index);

router.post('/user-tickets', authMiddleware, userTicketsController.store);

router.delete('/user-tickets/:userTicketId', authMiddleware, userTicketsController.delete);

export default router;