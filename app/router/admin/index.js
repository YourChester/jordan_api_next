import { Router } from 'express';
import rolesRouter from './roles.js';
import userRouter from './users.js';
import authRouter from './auth.js';
import { authMiddleware } from '../../middlewares/index.js';

const adminRouter = new Router();

adminRouter.use('/roles', authMiddleware, rolesRouter);
adminRouter.use('/users', authMiddleware, userRouter);
adminRouter.use('/auth', authRouter);

export default adminRouter;
