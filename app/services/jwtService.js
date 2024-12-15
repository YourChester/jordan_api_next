import jwt from 'jsonwebtoken';

export default class JwtService {
	static generateToken(payload) {
		return jwt.sign(payload, process.env.APP_SECRET_KEY, {
			expiresIn: '5m',
		});
	}

	static decodeToken(token) {
		let decode_token_user = null;
		let errors = null;

		jwt.verify(token, process.env.APP_SECRET_KEY, (err, decode) => {
			if (err) {
				errors = err;
			} else {
				decode_token_user = decode;
			}
		});

		return {
			decode_token_user,
			errors,
		};
	}

	static generateRefreshToken(payload) {
		return jwt.sign(payload, process.env.APP_SECRET_KEY, {
			expiresIn: '1d',
		});
	}
}
