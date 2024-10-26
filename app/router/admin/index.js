import { Router } from 'express';
import rolesRouter from './roles.js';

const adminRouter = new Router();

adminRouter.use('/roles', rolesRouter);

export default adminRouter;
