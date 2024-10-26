import { Router } from 'express';
import authRouter from './auth.router.js';
import roleRouter from './role.router.js';
import userRouter from './user.router.js';
import categoryRouter from './category.router.js';
import genderRouter from './gender.router.js';

const adminRouter = new Router();

adminRouter.use('/auth', authRouter);
adminRouter.use('/role', roleRouter);
adminRouter.use('/user', userRouter);
adminRouter.use('/category', categoryRouter);
adminRouter.use('/gender', genderRouter);

export default adminRouter;
