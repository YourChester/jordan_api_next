import { Router } from 'express';
import AuthController from '../../controllers/shared/authController.js';
import { authMiddleware } from '../../middlewares/index.js';

const authRouter = new Router();
const authController = new AuthController();

authRouter.post('/login', (req, res, next) =>
	authController.logIn(req, res, next)
);
authRouter.get('/user_info', authMiddleware, (req, res, next) =>
	authController.userInfo(req, res, next)
);
authRouter.get('/logout', authMiddleware, (req, res, next) =>
	authController.logOut(req, res, next)
);
authRouter.get('/check_auth', authMiddleware, (req, res, next) =>
	authController.checkAuth(req, res, next)
);

export default authRouter;
