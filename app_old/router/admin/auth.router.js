import { Router } from 'express';
import auth_middleware from '../../middlewares/auth.middleware.js';
import AuthController from '../../controllers/admin/auth.controller.js';

const authRouter = new Router();
const authController = new AuthController();

authRouter.post('/log_in', authController.log_in);
authRouter.get('/log_out', auth_middleware, authController.log_out);
authRouter.get('/check_auth', auth_middleware, authController.check_auth);
authRouter.get('/user_info', auth_middleware, authController.user_info);

export default authRouter;
