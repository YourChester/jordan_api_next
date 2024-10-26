import ErrorController from '../shared/error.controller.js';
import UserService from '../../services/user.service.js';
import { hash_password } from '../../helpers/password.helpers.js';

export default class UserController {
	async index(req, res, next) {
		try {
			const { page, per_page } = req.query;
			const { users, pagination } = await UserService.list(
				page,
				per_page
			);

			return res.status(200).json({
				users,
				pagination,
			});
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { login, name, password, role, visibility } = req.body;

			const is_exist_login = await UserService.find_one({ login });

			if (is_exist_login) {
				throw ErrorController.unprocessable_entity({
					errors: { login: 'Должен быть уникальным' },
				});
			}
			const hash_user_password = hash_password(password);

			const user = await UserService.create(
				login,
				name,
				hash_user_password,
				role,
				visibility
			);
			return res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	async get_one(req, res, next) {
		try {
			const { id } = req.params;

			const user = await UserService.get_one(id);

			if (!user) {
				throw ErrorController.not_found('Пользователь не найден');
			}

			return res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	async update_one(req, res, next) {
		try {
			const { id } = req.params;
			const { login, name, password, role, visibility } = req.body;

			const is_exist_id = await UserService.get_one(id);

			if (!is_exist_id) {
				throw ErrorController.not_found('Пользователь не найден');
			}

			const is_exist_login = await UserService.find_one({ login });

			if (is_exist_login) {
				throw ErrorController.unprocessable_entity({
					errors: { login: 'Должен быть уникальным' },
				});
			}

			let hash_user_password = '';
			if (password) {
				hash_user_password = hash_password(password);
			}

			const user = await UserService.update_one(
				id,
				login,
				name,
				hash_user_password,
				role,
				visibility
			);

			return res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	async delete_one(req, res, next) {
		try {
			const { id } = req.params;

			const is_exist_id = await UserService.get_one(id);

			if (!is_exist_id) {
				throw ErrorController.not_found('Пользователь не найден');
			}

			const result = await UserService.delete_one(id);

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
