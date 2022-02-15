import { Router } from 'express';
import addressController from '../controllers/addressController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/addresses', authMiddleware, addressController.fetch);

router.get('/addresses/:addressId', authMiddleware, addressController.index);

router.post('/addresses', authMiddleware, addressController.store);

router.post('/addresses/link-unlink/', authMiddleware, addressController.linkAddressWithEntity);

router.put('/addresses/:addressId', authMiddleware, addressController.update);

router.delete('/addresses/:addressId', authMiddleware, addressController.delete);

export default router;