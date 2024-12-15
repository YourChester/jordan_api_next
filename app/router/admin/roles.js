import { Router } from 'express';
import RoleController from '../../controllers/admin/roleController.js';

const rolesRouter = new Router();
const roleController = new RoleController();

rolesRouter.get('/', (req, res, next) => roleController.index(req, res, next));
rolesRouter.post('/', (req, res, next) =>
	roleController.create(req, res, next)
);
rolesRouter.get('/:id', (req, res, next) => roleController.one(req, res, next));
rolesRouter.put('/:id', (req, res, next) =>
	roleController.update(req, res, next)
);
rolesRouter.delete('/:id', (req, res, next) =>
	roleController.delete(req, res, next)
);

export default rolesRouter;
