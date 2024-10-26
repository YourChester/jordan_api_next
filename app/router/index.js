import { Router } from 'express';
import adminRouter from './admin/index.js'

const router = new Router();

router.use('/admin', adminRouter);

export default router;
