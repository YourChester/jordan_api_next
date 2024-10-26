import ErrorController from '../shared/error.controller.js';
import RoleService from '../../services/role.service.js';

export default class RoleController {
	async index(req, res, next) {
		try {
			const { page, per_page } = req.query;
			const { roles, pagination } = await RoleService.list(
				page,
				per_page
			);
			return res.status(200).json({
				roles,
				pagination,
			});
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { key, name } = req.body;

			const is_exist_key = await RoleService.find_one({ key });

			if (is_exist_key) {
				throw ErrorController.unprocessable_entity({
					errors: { key: 'Должен быть уникальным' },
				});
			}

			const role = await RoleService.create(key, name);
			return res.status(200).json(role);
		} catch (error) {
			next(error);
		}
	}

	async get_one(req, res, next) {
		try {
			const { id } = req.params;

			const role = await RoleService.get_one(id);

			if (!role) {
				throw ErrorController.not_found('Роль не найдена');
			}

			return res.status(200).json(role);
		} catch (error) {
			next(error);
		}
	}

	async update_one(req, res, next) {
		try {
			const { id } = req.params;
			const { name, key } = req.body;

			const is_exist_id = await RoleService.get_one(id);

			if (!is_exist_id) {
				throw ErrorController.not_found('Роль не найдена');
			}

			const is_exist_key = await RoleService.find_one({ key });

			if (is_exist_key && is_exist_key.id.toString() !== id) {
				throw ErrorController.unprocessable_entity({
					errors: { key: 'Должен быть уникальным' },
				});
			}

			const role = await RoleService.update_one(id, key, name);

			return res.status(200).json(role);
		} catch (error) {
			next(error);
		}
	}

	async delete_one(req, res, next) {
		try {
			const { id } = req.params;

			const is_exist_id = await RoleService.get_one(id);

			if (!is_exist_id) {
				throw ErrorController.not_found('Роль не найдена');
			}

			const result = await RoleService.delete_one(id);

			if (!result) {
				throw ErrorController.unprocessable_entity({
					errors: {
						base: 'Не удалось удалить, обратитесь к администратору',
					},
				});
			}

			return res.status(200).json({});
		} catch (error) {
			next(error);
		}
	}
}
