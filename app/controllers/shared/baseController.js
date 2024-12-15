import ErrorController from './errorController.js';

export default class BaseController {
	async index(req, res, next) {
		next(ErrorController.notFound('Запрос не обработан'));
	}

	async one(req, res, next) {
		next(ErrorController.notFound('Запрос не обработан'));
	}

	async create(req, res, next) {
		next(ErrorController.notFound('Запрос не обработан'));
	}

	update(req, res, next) {
		next(ErrorController.notFound('Запрос не обработан'));
	}

	delete(req, res, next) {
		next(ErrorController.notFound('Запрос не обработан'));
	}
}
