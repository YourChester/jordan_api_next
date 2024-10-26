import { Router } from 'express';
import RoleController from '../../controllers/admin/roleController.js';

const rolesRouter = new Router();
const roleController = new RoleController()

rolesRouter.get('/', roleController.index);
rolesRouter.post('/', roleController.create);
rolesRouter.get('/:id', roleController.one);
rolesRouter.put('/:id', roleController.update);
rolesRouter.delete('/:id', roleController.delete);

export default rolesRouter;
