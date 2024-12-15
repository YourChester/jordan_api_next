import ErrorController from '../controllers/shared/errorController.js';

function errorMiddleware(err, req, res, next) {
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

export default errorMiddleware;
