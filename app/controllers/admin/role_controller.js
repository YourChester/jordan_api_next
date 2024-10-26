import RoleRepository from '../../repositories/role_repository';

export default class RoleController {
	index(req, res, next) {
		try {
			const params = this.#prepareParams(req.query);
			const result = RoleRepository.list(params.page, params.perPage);
			return res.status(200).json({
				rows: result.rows,
				pagination: result.pagination,
			});
		} catch (error) {
			next(error);
		}
	}

	one(req, res, next) {
		try {
			return res.status(200).json({});
		} catch (error) {
			next(error);
		}
	}

	create(req, res, next) {
		try {
			return res.status(200).json({});
		} catch (error) {
			next(error);
		}
	}

	update(req, res, next) {
		try {
			return res.status(200).json({});
		} catch (error) {
			next(error);
		}
	}

	delete(req, res, next) {
		try {
			return res.status(200).json({});
		} catch (error) {
			next(error);
		}
	}

	#prepareParams(params) {
		const newParams = {
			page: params.page || 1,
			perPage: params.perPage || process.env.APP_PER_PAGE,
		};
		return newParams;
	}
}
