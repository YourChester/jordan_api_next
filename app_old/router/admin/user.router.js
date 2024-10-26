import { Router } from 'express';
import auth_middleware from '../../middlewares/auth.middleware.js';
import UserController from '../../controllers/admin/user.controller.js';

const userRouter = new Router();
const userController = new UserController();

userRouter.get('/', auth_middleware, userController.index);
userRouter.post('/', auth_middleware, userController.create);
userRouter.get('/:id', auth_middleware, userController.get_one);
userRouter.put('/:id', auth_middleware, userController.update_one);
userRouter.delete('/:id', auth_middleware, userController.delete_one);

export default userRouter;
