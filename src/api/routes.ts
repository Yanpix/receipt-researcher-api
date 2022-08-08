import { Router } from 'express';
import UserRoutes from './user/user.routes';
import AuthRoutes from './auth/auth.routes';
import ReceiptRoutes from './receipt/receipt.routes';

const router = Router();

router.use('/users', UserRoutes);
router.use('/auth', AuthRoutes);
router.use('/users/:userId/receipt', ReceiptRoutes);

export default router;