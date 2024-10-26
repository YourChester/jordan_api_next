import { Router } from 'express';
import auth_middleware from '../../middlewares/auth.middleware.js';
import RoleController from '../../controllers/admin/role.controller.js';

const roleRouter = new Router();
const roleController = new RoleController();

roleRouter.get('/', auth_middleware, roleController.index);
roleRouter.post('/', auth_middleware, roleController.create);
roleRouter.get('/:id', auth_middleware, roleController.get_one);
roleRouter.put('/:id', auth_middleware, roleController.update_one);
roleRouter.delete('/:id', auth_middleware, roleController.delete_one);

export default roleRouter;
