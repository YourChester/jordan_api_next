import ErrorController from '../controllers/shared/errorController.js';
import JwtService from '../services/jwtService.js';

function authMiddleware(req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}

	const token = req.headers?.authorization?.split(' ')[1] || '';
	if (!token) {
		const error = ErrorController.unauthorized('Доступ запрещен');
		return res.status(error.status).json(error);
	}
	const result = JwtService.decodeToken(token);
	if (result.errors) {
		if (result.errors.name == 'TokenExpiredError') {
			const error = ErrorController.unauthorized('Доступ запрещен');
			return res.status(error.status).json(error);
		} else {
			return res.status(500).json(errors);
		}
	}
	req.decodeToken = result.decodeToken;
	next();
}

export default authMiddleware;
