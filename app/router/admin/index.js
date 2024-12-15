import { Router } from 'express';
import rolesRouter from './roles.js';
import userRouter from './users.js';

const adminRouter = new Router();

adminRouter.use('/roles', rolesRouter);
adminRouter.use('/users', userRouter);

export default adminRouter;
