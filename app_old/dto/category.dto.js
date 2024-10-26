export default class CategoryDto {
	constructor(model) {
		this.id = model._id;
		this.name = model.name;
		this.parent = model.parent ? new CategoryDto(model.parent) : null;
		this.create_at = model.create_at || null;
		this.update_at = model.update_at || null;
	}
}
