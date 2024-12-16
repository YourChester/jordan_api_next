import jwt from 'jsonwebtoken';

export default class JwtService {
	static generateToken(payload) {
		return jwt.sign(payload, process.env.APP_SECRET_KEY, {
			expiresIn: '5m',
		});
	}

	static decodeToken(token) {
		let decodeToken = null;
		let errors = null;

		jwt.verify(token, process.env.APP_SECRET_KEY, (err, decode) => {
			if (err) {
				errors = err;
			} else {
				decodeToken = decode;
			}
		});

		return {
			decodeToken,
			errors,
		};
	}

	static generateRefreshToken(payload) {
		return jwt.sign(payload, process.env.APP_SECRET_KEY, {
			expiresIn: '1d',
		});
	}
}
