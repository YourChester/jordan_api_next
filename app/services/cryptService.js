import bcrypt from 'bcryptjs';

export default class CryptService {
	static hashPassword(password) {
		return bcrypt.hashSync(password, Number(process.env.APP_SALT_HASH));
	}

	static validatePassword(password, userPassword) {
		return bcrypt.compareSync(password, userPassword);
	}
}
