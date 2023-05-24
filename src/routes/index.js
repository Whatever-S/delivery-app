import { Router } from 'express';
import orderRouter from './order.router.js';
import shopsRouter from './shops.router.js';

const router = Router();

router.use('/shops', shopsRouter);
router.use('/order', orderRouter);

export default router;