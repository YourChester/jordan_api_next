import { Router } from 'express';
import UserController from '../../controllers/admin/userController.js';

const userRouter = new Router();
const userController = new UserController();

userRouter.get('/', (req, res, next) => userController.index(req, res, next));
userRouter.post('/', (req, res, next) => userController.create(req, res, next));
userRouter.get('/:id', (req, res, next) => userController.one(req, res, next));
userRouter.put('/:id', (req, res, next) =>
	userController.update(req, res, next)
);
userRouter.delete('/:id', (req, res, next) =>
	userController.delete(req, res, next)
);

export default userRouter;
