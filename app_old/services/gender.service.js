import GenderModel from '../models/gender.model.js';
import GenderDto from '../dto/gender.dto.js';

class GenderService {
	async list(page = 1, per_page = 15) {
		const genders = await GenderModel.find()
			.limit(per_page)
			.skip(per_page * page - per_page);
		const count = await GenderModel.countDocuments();

		return {
			genders: genders.map((gender) => new GenderDto(gender)),
			pagination: {
				total_item: count,
				total_pages: Math.ceil(count / per_page),
				current_page: page,
				current_per_page: per_page,
			},
		};
	}

	async create(name) {
		const create_at = new Date().toISOString();
		const gender = await new GenderModel({
			name,
			create_at,
		}).save();

		return new GenderDto(gender);
	}

	async find_one(params) {
		const gender = await GenderModel.findOne(params);
		return gender ? new GenderDto(gender) : null;
	}

	async get_one(id) {
		const gender = await GenderModel.findById(id);

		return gender ? new GenderDto(gender) : null;
	}

	async update_one(id, name) {
		const update_at = new Date().toISOString();
		await GenderModel.updateOne({ _id: id }, { name, update_at });
		const gender = await this.get_one(id);
		return gender ? new GenderDto(gender) : null;
	}

	async delete_one(id) {
		const result = await GenderModel.deleteOne({ _id: id });
		return result.deletedCount > 0;
	}
}

export default new GenderService();
