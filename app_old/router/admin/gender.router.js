import { Router } from 'express';
import auth_middleware from '../../middlewares/auth.middleware.js';
import GenderController from '../../controllers/admin/gender.controller.js';

const genderRouter = new Router();
const genderController = new GenderController();

genderRouter.get('/', auth_middleware, genderController.index);
genderRouter.post('/', auth_middleware, genderController.create);
genderRouter.get('/:id', auth_middleware, genderController.get_one);
genderRouter.put('/:id', auth_middleware, genderController.update_one);
genderRouter.delete('/:id', auth_middleware, genderController.delete_one);

export default genderRouter;
