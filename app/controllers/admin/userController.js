import BaseController from '../shared/baseController.js';
import ErrorController from '../shared/errorController.js';
import CryptService from '../../services/cryptService.js';
import UserRepository from '../../repositories/userRepository.js';
import UserDto from '../../dto/admin/userDto.js';

export default class UserController extends BaseController {
	async index(req, res, next) {
		try {
			const params = this.#prepareParams(req.query);
			const result = await UserRepository.list(params);
			return res.status(200).json({
				rows: result.rows.map((user) => new UserDto(user)),
				pagination: result.pagination,
			});
		} catch (error) {
			next(error);
		}
	}

	async one(req, res, next) {
		try {
			const id = req.params.id;
			const result = await UserRepository.getOne(id);
			if (!result) {
				throw ErrorController.notFound('Запись не найдена');
			}
			return res.status(200).json(new UserDto(result));
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const body = req.body;
			if (body.password) {
				body.password = CryptService.hashPassword(body.password);
			}
			const result = await UserRepository.create(body);
			return res.status(200).json(new UserDto(result));
		} catch (error) {
			if (error.errors) {
				next(
					ErrorController.unprocessableEntity(
						this.#transformValidation(error.errors)
					)
				);
			} else {
				next(error);
			}
		}
	}

	async update(req, res, next) {
		try {
			const id = req.params.id;
			const body = req.body;
			const user = await UserRepository.getOne(id);
			if (!user) {
				throw ErrorController.notFound('Запись не найдена');
			}
			if (CryptService.validatePassword(body.password, user.password)) {
				delete body.password;
			} else if (
				body.password &&
				!CryptService.validatePassword(body.password, user.password)
			) {
				body.password = CryptService.hashPassword(body.password);
			}
			const result = await UserRepository.update(id, body);
			return res.status(200).json(new UserDto(result));
		} catch (error) {
			if (error.errors) {
				next(
					ErrorController.unprocessableEntity(
						this.#transformValidation(error.errors)
					)
				);
			} else {
				next(error);
			}
		}
	}

	async delete(req, res, next) {
		try {
			const id = req.params.id;
			const result = await UserRepository.delete(id);
			if (!result) {
				throw ErrorController.notFound('Запись не найдена');
			}
			return res.status(200).json({});
		} catch (error) {
			next(error);
		}
	}

	#prepareParams(params) {
		return {
			page: params && params.page ? params.page : 1,
			perPage: params && params.perPage ? params.perPage : 15,
		};
	}

	#transformValidation(errors) {
		const errorObj = {};
		if (errors?.login) {
			errorObj.login = errors.login.message;
		}
		if (errors?.name) {
			errorObj.name = errors.name.message;
		}
		if (errors?.password) {
			errorObj.password = errors.password.message;
		}
		if (errors?.role_id) {
			errorObj.role_id = errors.role_id.message;
		}
		return errorObj;
	}
}
