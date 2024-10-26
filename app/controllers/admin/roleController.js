import RoleDto from '../../dto/admin/roleDto.js';
import RoleRepository from '../../repositories/roleRepository.js';
import ErrorController from '../shared/errorController.js';

const prepareParams = (params) => {
	const newParams = {
		page: params && params.page ? params.page : 1,
		perPage: params && params.perPage ? params.perPage : 15
	};
	return newParams;
}

const transformValidation = (errors) => {
	const errorOnj = {}
	if (errors?.name) {
		errorOnj.name = errors.name.message
	}
	if (errors?.key) {
		errorOnj.key = errors.key.message
	}
	return errorOnj
}

export default class RoleController {
	async index(req, res, next) {
		try {
			const params = prepareParams(req.query);
			const result = await RoleRepository.list(params.page, params.perPage);
			return res.status(200).json({
				rows: result.rows.map(role => new RoleDto(role)),
				pagination: result.pagination,
			});
		} catch (error) {
			next(error);
		}
	}

	async one(req, res, next) {
		try {
			const { id } = req.params;
			const result = await RoleRepository.getOne(id)
			if (!result) {
				throw ErrorController.not_found('Запись не найдена')
			}
			return res.status(200).json(new RoleDto(result));
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const body = req.body
			const result = await RoleRepository.create(body)
			return res.status(200).json(new RoleDto(result));
		} catch (error) {
			if (error.errors) {
				next(ErrorController.unprocessable_entity(transformValidation(error.errors)))
			} else {
				next(error);
			}
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params
			const body = req.body
			const result = await RoleRepository.update(id, body)
			return res.status(200).json(new RoleDto(result));
		} catch (error) {
			console.log(error)
			if (error.errors) {
				next(ErrorController.unprocessable_entity(transformValidation(error.errors)))
			} else {
				next(error);
			}
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params
			const result = await RoleRepository.delete(id)
			if (!result) {
				throw ErrorController.not_found('Запись не найдена')
			}
			return res.status(200).json({});
		} catch (error) {
			next(error);
		}
	}
}
