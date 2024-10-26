import ErrorController from '../shared/error.controller.js';
import {
	generate_refresh_token,
	generate_token,
	validate_password,
} from '../../helpers/password.helpers.js';
import AuthService from '../../services/auth.service.js';
import UserService from '../../services/user.service.js';

export default class AuthController {
	async log_in(req, res, next) {
		try {
			const { login, password } = req.body;

			if (!login || !password) {
				const errors = {};
				if (!login) {
					errors.login = 'Поле логин обязательное';
				}
				if (!password) {
					errors.password = 'Поле пароль обязательное';
				}
				throw ErrorController.unprocessable_entity(errors);
			}

			const user = await UserService.find_one({ login });
			if (!user || !user.visibility) {
				throw ErrorController.unprocessable_entity({
					base: 'Пользователь не найден',
				});
			}

			if (!validate_password(password, user.password)) {
				throw ErrorController.unprocessable_entity({
					password: 'Неверный пароль',
				});
			}

			const token = generate_token({
				user_id: user.id,
				role: user.role.key,
			});
			const refresh_token = generate_refresh_token({
				user_id: user.id,
				role: user.role.key,
			});

			const session = await AuthService.create_auth(
				user.id,
				token,
				refresh_token
			);

			return res.status(200).json(session);
		} catch (errors) {
			console.log(errors);
			next(errors);
		}
	}

	async log_out(req, res, next) {
		try {
			const { user_id } = req.user;

			if (!user_id) {
				throw ErrorController.bad_request('Токен не валиден');
			}

			const result = await AuthService.delete_auth(user_id);

			if (result.deletedCount == 0) {
				throw ErrorController.bad_request('Токен не валиден');
			}

			return res.status(200).json({});
		} catch (errors) {
			next(errors);
		}
	}

	async user_info(req, res, next) {
		try {
			const { user_id } = req.user;

			if (!user_id) {
				throw ErrorController.bad_request('Токен не валиден');
			}

			const user = await UserService.get_one(user_id);

			if (!user) {
				throw ErrorController.unprocessable_entity({
					base: 'Пользователь не найден',
				});
			}

			return res.status(200).json({ user });
		} catch (errors) {
			next(errors);
		}
	}

	check_auth(req, res) {
		return res.status(200).json({});
	}
}
