import ErrorController from '../controllers/shared/error_controller.js';

function error_middleware(err, req, res, next) {
	if (err instanceof ErrorController) {
		const { status, message, errors } = err;
		return res.status(status).json({
			code: status,
			message,
			errors,
		});
	}
	return res.status(500).json({ message: 'Непредвиденная ошибка' });
}

export default error_middleware;
