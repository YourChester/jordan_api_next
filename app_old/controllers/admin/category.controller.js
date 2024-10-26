import ErrorController from '../shared/error.controller.js';
import CategoryService from '../../services/category.service.js';

export default class CategoryController {
	async index(req, res, next) {
		try {
			const { page, per_page } = req.query;
			const { categories, pagination } = await CategoryService.list(
				page,
				per_page
			);
			return res.status(200).json({
				categories,
				pagination,
			});
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { name, parent } = req.body;

			const is_exist_name = await CategoryService.find_one({ name });

			if (is_exist_name) {
				throw ErrorController.unprocessable_entity({
					errors: { name: 'Должен быть уникальным' },
				});
			}

			const category = await CategoryService.create(name, parent);
			return res.status(200).json(category);
		} catch (error) {
			next(error);
		}
	}

	async get_one(req, res, next) {
		try {
			const { id } = req.params;

			const category = await CategoryService.get_one(id);

			if (!role) {
				throw ErrorController.not_found('Категория не найдена');
			}

			return res.status(200).json(category);
		} catch (error) {
			next(error);
		}
	}

	async update_one(req, res, next) {
		try {
			const { id } = req.params;
			const { name, parent } = req.body;

			const is_exist_id = await CategoryService.get_one(id);

			if (!is_exist_id) {
				throw ErrorController.not_found('Категория не найдена');
			}

			const is_exist_name = await CategoryService.find_one({ name });

			if (is_exist_name) {
				throw ErrorController.unprocessable_entity({
					errors: { name: 'Должен быть уникальным' },
				});
			}

			const category = await CategoryService.update_one(id, name, parent);

			return res.status(200).json(category);
		} catch (error) {
			next(error);
		}
	}

	async delete_one(req, res, next) {
		try {
			const { id } = req.params;

			const is_exist_id = await CategoryService.get_one(id);

			if (!is_exist_id) {
				throw ErrorController.not_found('Категория не найдена');
			}

			const result = await CategoryService.delete_one(id);

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
