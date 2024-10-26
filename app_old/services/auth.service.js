import AuthModel from '../models/auth.model.js';

class AuthService {
	async create_auth(user_id, token, refresh_token) {
		const exist_auth = await AuthModel.findOne({ user_id });
		let newAuth = null;
		if (exist_auth) {
			await AuthModel.updateOne(
				{ _id: exist_auth._id },
				{ $set: { user_id, token, refresh_token } }
			);
			newAuth = await AuthModel.findOne({ user_id });
		} else {
			const auth = new AuthModel({
				user_id,
				token,
				refresh_token,
			});
			newAuth = await auth.save();
		}
		return {
			token: newAuth.token || '',
			refresh_token: newAuth.refresh_token || '',
		};
	}

	async delete_auth(user_id) {
		return await AuthModel.deleteOne({ user_id });
	}
}

export default new AuthService();
