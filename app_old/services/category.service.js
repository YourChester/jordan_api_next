import CategoryModel from '../models/category.model.js';
import CategoryDto from '../dto/category.dto.js';

class CategoryService {
	async list(page = 1, per_page = 15) {
		const categories = await CategoryModel.find()
			.populate({
				path: 'parent',
				model: CategoryModel,
			})
			.limit(per_page)
			.skip(per_page * page - per_page);
		const count = await CategoryModel.countDocuments();

		return {
			categories: categories.map((category) => new CategoryDto(category)),
			pagination: {
				total_item: count,
				total_pages: Math.ceil(count / per_page),
				current_page: page,
				current_per_page: per_page,
			},
		};
	}

	async create(name, parent = null) {
		const create_at = new Date().toISOString();
		const category = await new CategoryModel({
			name,
			parent,
			create_at,
		}).save();

		return new CategoryDto(category);
	}

	async find_one(params) {
		const category = await CategoryModel.findOne(params);
		return category ? new CategoryDto(category) : null;
	}

	async get_one(id) {
		const category = await CategoryModel.findById(id);

		return category ? new CategoryDto(category) : null;
	}

	async update_one(id, name, parent = null) {
		const update_at = new Date().toISOString();
		await CategoryModel.updateOne({ _id: id }, { name, parent, update_at });
		const category = await this.get_one(id);
		return category ? new CategoryDto(category) : null;
	}

	async delete_one(id) {
		const result = await CategoryModel.deleteOne({ _id: id });
		return result.deletedCount > 0;
	}
}

export default new CategoryService();
