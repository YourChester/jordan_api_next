import ErrorController from './errorController.js';
import UserRepository from '../../repositories/userRepository.js';
import SessionRepository from '../../repositories/sessinonRepository.js';
import CryptService from '../../services/cryptService.js';

export default class AuthController {
	async logIn(req, res, next) {
		try {
			const login = req.body.login;
			const password = req.body.password;

			if (!login || !password) {
				throw ErrorController.unprocessableEntity({
					login: 'Обязательное поле',
					password: 'Обязательное поле',
				});
			}

			const user = await UserRepository.findOne({ login });

			if (!user) {
				throw ErrorController.unprocessableEntity({
					login: 'Неверный логин',
				});
			}

			if (!CryptService.validatePassword(password, user.password)) {
				throw ErrorController.unprocessableEntity({
					password: 'Неверный пароль',
				});
			}

			const token = generate_token({
				user_id: user._id,
				role_id: user.role_id,
			});
			const refresh_token = generate_refresh_token({
				user_id: user._id,
				role_id: user.role_id,
			});

			const session = SessionRepository.create({
				user_id: user._id,
				token,
				refresh_token,
			});

			return res.status(200).json(session);
		} catch (errors) {
			next(errors);
		}
	}

	async logOut(req, res, next) {
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

	async userInfo(req, res, next) {
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

	checkAuth(req, res) {
		return res.status(200).json({});
	}
}
