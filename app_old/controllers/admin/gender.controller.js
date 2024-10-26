import ErrorController from '../shared/error.controller.js';
import GenderService from '../../services/gender.service.js';

export default class GenderController {
	async index(req, res, next) {
		try {
			const { page, per_page } = req.query;
			const { genders, pagination } = await GenderService.list(
				page,
				per_page
			);
			return res.status(200).json({
				genders,
				pagination,
			});
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { name } = req.body;

			const is_exist_name = await GenderService.find_one({ name });

			if (is_exist_name) {
				throw ErrorController.unprocessable_entity({
					errors: { name: 'Должен быть уникальным' },
				});
			}

			const gender = await GenderService.create(name);
			return res.status(200).json(gender);
		} catch (error) {
			next(error);
		}
	}

	async get_one(req, res, next) {
		try {
			const { id } = req.params;

			const gender = await GenderService.get_one(id);

			if (!gender) {
				throw ErrorController.not_found('Гендер не найдена');
			}

			return res.status(200).json(gender);
		} catch (error) {
			next(error);
		}
	}

	async update_one(req, res, next) {
		try {
			const { id } = req.params;
			const { name } = req.body;

			const is_exist_id = await GenderService.get_one(id);

			if (!is_exist_id) {
				throw ErrorController.not_found('Гендер не найдена');
			}

			const is_exist_name = await GenderService.find_one({ name });

			if (is_exist_name) {
				throw ErrorController.unprocessable_entity({
					errors: { name: 'Должен быть уникальным' },
				});
			}

			const gender = await GenderService.update_one(id, name);

			return res.status(200).json(gender);
		} catch (error) {
			next(error);
		}
	}

	async delete_one(req, res, next) {
		try {
			const { id } = req.params;

			const is_exist_id = await GenderService.get_one(id);

			if (!is_exist_id) {
				throw ErrorController.not_found('Гендер не найдена');
			}

			const result = await GenderService.delete_one(id);

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
