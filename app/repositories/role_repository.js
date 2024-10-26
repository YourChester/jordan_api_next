import Role from '../models/role_model';
import PagiService from '../services/pagi_service';

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
}
