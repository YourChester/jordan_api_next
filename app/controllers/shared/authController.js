import ErrorController from './errorController.js';
import UserRepository from '../../repositories/userRepository.js';
import SessionRepository from '../../repositories/sessinonRepository.js';
import CryptService from '../../services/cryptService.js';
import JwtService from '../../services/jwtService.js';
import UserDto from '../../dto/admin/userDto.js';

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

			if (!user || !user.visibility) {
				throw ErrorController.unprocessableEntity({
					login: 'Неверный логин',
				});
			}

			if (!CryptService.validatePassword(password, user.password)) {
				throw ErrorController.unprocessableEntity({
					password: 'Неверный пароль',
				});
			}

			const oldSession = await SessionRepository.findOne({
				user_id: user._id,
			});
			if (oldSession) {
				await SessionRepository.delete(oldSession._id);
			}

			const session = SessionRepository.create();

			session.user_id = user._id;
			session.token = JwtService.generateToken({
				session_id: session._id,
			});
			session.refresh_token = JwtService.generateRefreshToken({
				session_id: session._id,
			});

			const newSession = await SessionRepository.save(session);

			return res.status(200).json(newSession);
		} catch (errors) {
			next(errors);
		}
	}

	async logOut(req, res, next) {
		try {
			const session_id = req.decodeToken.session_id;

			if (!session_id) {
				throw ErrorController.unauthorized('Доступ запрещен');
			}

			const session = await SessionRepository.getOne(session_id);

			if (!session) {
				throw ErrorController.unauthorized('Доступ запрещен');
			}

			await SessionRepository.delete(session_id);

			return res.status(200).json({});
		} catch (errors) {
			next(errors);
		}
	}

	async userInfo(req, res, next) {
		try {
			const session_id = req.decodeToken.session_id;

			if (!session_id) {
				throw ErrorController.unauthorized('Доступ запрещен');
			}
			const session = await SessionRepository.getOne(session_id);
			const user = await UserRepository.getOne(session.user_id);

			if (!user) {
				throw ErrorController.unprocessableEntity({
					base: 'Пользователь не найден',
				});
			}

			return res.status(200).json(new UserDto(user));
		} catch (errors) {
			next(errors);
		}
	}

	async checkAuth(req, res) {
		try {
			const session_id = req.decodeToken.session_id;

			const session = await SessionRepository.getOne(session_id);

			if (!session) {
				throw ErrorController.unprocessableEntity({
					base: 'Сессия не найден',
				});
			}

			return res.status(200).json({});
		} catch (errors) {
			next(errors);
		}
	}
}
