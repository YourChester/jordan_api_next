import BaseController from '../shared/baseController.js';
import RoleDto from '../../dto/admin/roleDto.js';
import RoleRepository from '../../repositories/roleRepository.js';
import ErrorController from '../shared/errorController.js';

export default class RoleController extends BaseController {
	async index(req, res, next) {
		try {
			const params = this.#prepareParams(req.query);
			const result = await RoleRepository.list(params);
			return res.status(200).json({
				rows: result.rows.map((role) => new RoleDto(role)),
				pagination: result.pagination,
			});
		} catch (error) {
			next(error);
		}
	}

	async one(req, res, next) {
		try {
			const id = req.params.id;
			const result = await RoleRepository.getOne(id);
			if (!result) {
				throw ErrorController.notFound('Запись не найдена');
			}
			return res.status(200).json(new RoleDto(result));
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const body = req.body;
			const result = await RoleRepository.create(body);
			return res.status(200).json(new RoleDto(result));
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
			const result = await RoleRepository.update(id, body);
			return res.status(200).json(new RoleDto(result));
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
			const result = await RoleRepository.delete(id);
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
		if (errors?.name) {
			errorObj.name = errors.name.message;
		}
		if (errors?.key) {
			errorObj.key = errors.key.message;
		}
		return errorObj;
	}
}
