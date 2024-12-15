import User from '../models/userModel.js';
import PagiService from '../services/pagiService.js';

export default class UserRepository {
	static async list(params) {
		const rows = await User.aggregate([
			{
				$lookup: {
					from: 'roles',
					localField: 'role_id',
					foreignField: '_id',
					as: 'role',
				},
			},
		])
			.limit(params.perPage)
			.skip(params.perPage * params.page - params.perPage);
		const count = await User.countDocuments();

		return {
			rows,
			...PagiService.pagi(params.page, params.perPage, count),
		};
	}

	static async getOne(id) {
		const row = await User.findById(id);
		return row;
	}

	static async findOne(params) {
		const row = await User.find(params);
		return row;
	}

	static async create(body) {
		const newUser = new User(body);
		return await newUser.save();
	}

	static async update(id, body) {
		await User.updateOne({ _id: id }, { ...body });
		return await UserRepository.getOne(id);
	}

	static async delete(id) {
		return await User.findByIdAndDelete(id);
	}
}
