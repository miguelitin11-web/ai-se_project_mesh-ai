import { Router } from 'express';
import { queryDocuments } from '../controllers/query.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.post('/', queryDocuments);

export default router;
