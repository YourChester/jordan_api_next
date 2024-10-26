import { decode_token } from '../helpers/password.helpers.js';

function auth_middleware(req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}

	const token = req.headers?.authorization?.split(' ')[1] || '';
	if (!token) {
		return res.status(401).json({
			code: 401,
			message: 'Unauthorized',
			errors: { base: 'Доступ запрещен' },
		});
	}
	const { decode_token_user, errors } = decode_token(token);
	if (errors) {
		if (errors.name == 'TokenExpiredError') {
			return res.status(401).json({
				code: 401,
				message: 'Unauthorized',
				errors: { base: 'Токен протух' },
			});
		} else {
			return res.status(500).json(errors);
		}
	}
	req.user = decode_token_user;
	next();
}

export default auth_middleware;
