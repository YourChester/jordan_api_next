import { Router } from 'express';
import auth_middleware from '../../middlewares/auth.middleware.js';
import CategoryController from '../../controllers/admin/category.controller.js';

const categoryRouter = new Router();
const categoryController = new CategoryController();

categoryRouter.get('/', auth_middleware, categoryController.index);
categoryRouter.post('/', auth_middleware, categoryController.create);
categoryRouter.get('/:id', auth_middleware, categoryController.get_one);
categoryRouter.put('/:id', auth_middleware, categoryController.update_one);
categoryRouter.delete('/:id', auth_middleware, categoryController.delete_one);

export default categoryRouter;
