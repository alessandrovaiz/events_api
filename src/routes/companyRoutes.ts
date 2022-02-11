import { Router } from 'express';
import companyController from '../controllers/companyController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/companies', authMiddleware, companyController.fetch);

router.get('/companies/:companyId', authMiddleware, companyController.index);

router.post('/companies', authMiddleware, companyController.store);

router.put('/companies/:companyId', authMiddleware, companyController.update);

router.delete('/companies/:companyId', authMiddleware, companyController.delete);

export default router;