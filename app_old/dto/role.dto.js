export default class RoleDto {
	constructor(model) {
		this.id = model._id;
		this.name = model.name;
		this.key = model.key;
		this.create_at = model.create_at;
		this.update_at = model.update_at || null;
	}
}
