import Role from '../models/roleModel.js';
import PagiService from '../services/pagiService.js';

export default class RoleRepository {
	static async list(page, perPage) {
		const rows = await Role.find()
			.limit(perPage)
			.skip(perPage * page - perPage);
		const count = await Role.countDocuments();

		return {
			rows,
			...PagiService.pagi(page, perPage, count),
		};
	}

	static async getOne(id) {
		const row = await Role.findById(id)
		return row
	}

	static async create(body) {
		const newRole = new Role(body)
		return await newRole.save() 
	}

	static async update(id, body) {
		await Role.updateOne({ _id: id }, { ...body })
		return await RoleRepository.getOne(id)
	}

	static async delete(id) {
		return await Role.findByIdAndDelete(id)
	}
}
