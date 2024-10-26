import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hash_password = (password) => {
	return bcrypt.hashSync(password, Number(process.env.APP_SALT_HASH));
};

const validate_password = (req_password, user_password) => {
	return bcrypt.compareSync(req_password, user_password);
};

const generate_token = (payload) => {
	return jwt.sign(payload, process.env.APP_SECRET_KEY, { expiresIn: '5m' });
};

const decode_token = (token) => {
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
};

const generate_refresh_token = (payload) => {
	return jwt.sign(payload, process.env.APP_SECRET_KEY, { expiresIn: '1d' });
};

export {
	hash_password,
	validate_password,
	generate_token,
	generate_refresh_token,
	decode_token,
};
