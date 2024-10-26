import UserDto from '../dto/user.dto.js';
import RoleModel from '../models/role.model.js';
import UserModel from '../models/user.model.js';

class UserService {
	async list(page = 1, per_page = 15) {
		const users = await UserModel.find()
			.populate({
				path: 'role',
				model: RoleModel,
			})
			.limit(per_page)
			.skip(per_page * page - per_page);
		const count = await UserModel.countDocuments();

		return {
			roles: users.map((user) => new UserDto(user)),
			pagination: {
				total_item: count,
				total_pages: Math.ceil(count / per_page),
				current_page: page,
				current_per_page: per_page,
			},
		};
	}

	async create(login, name, password, role, visibility) {
		const create_at = new Date().toISOString();
		const user = await new UserModel({
			login,
			name,
			password,
			role,
			visibility,
			create_at,
		}).save();

		return user ? new UserDto(user) : null;
	}

	async find_one(params) {
		const user = await UserModel.findOne(params).populate({
			path: 'role',
			model: RoleModel,
		});
		return user ? new UserDto(user, true) : null;
	}

	async get_one(id) {
		const user = await UserModel.findById(id).populate('role');
		return user ? new UserDto(user) : null;
	}

	async update_one(id, login, name, password, role, visibility) {
		const update_at = new Date().toISOString();
		if (password) {
			await UserModel.updateOne(
				{ _id: id },
				{ key, login, name, password, role, visibility, update_at }
			);
		} else {
			await UserModel.updateOne(
				{ _id: id },
				{ key, login, name, role, visibility, update_at }
			);
		}
		const user = await this.get_one(id);

		return user ? new UserDto(user) : null;
	}

	async delete_one(id) {
		const result = await UserModel.deleteOne({ _id: id });
		return result.deletedCount > 0;
	}
}

export default new UserService();
