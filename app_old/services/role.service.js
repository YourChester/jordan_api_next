import PaginationService from './pagination.service.js';
import RoleModel from '../models/role.model.js';
import RoleDto from '../dto/role.dto.js';

class RoleService {
	async list(page = 1, per_page = 15) {
		const roles = await RoleModel.find()
			.limit(per_page)
			.skip(per_page * page - per_page);
		const count = await RoleModel.countDocuments();

		return {
			roles: roles.map((role) => new RoleDto(role)),
			pagination: PaginationService.pagi(page, per_page, count),
		};
	}

	async create(key, name) {
		const create_at = new Date().toISOString();
		const role = await new RoleModel({ name, key, create_at }).save();

		return new RoleDto(role);
	}

	async find_one(params) {
		const role = await RoleModel.findOne(params);
		return role ? new RoleDto(role) : null;
	}

	async get_one(id) {
		const role = await RoleModel.findById(id);
		return role ? new RoleDto(role) : null;
	}

	async update_one(id, key, name) {
		const update_at = new Date().toISOString();
		await RoleModel.updateOne({ _id: id }, { key, name, update_at });
		const role = await this.get_one(id);
		return role ? new RoleDto(role) : null;
	}

	async delete_one(id) {
		const result = await RoleModel.deleteOne({ _id: id });
		return result.deletedCount > 0;
	}
}

export default new RoleService();
