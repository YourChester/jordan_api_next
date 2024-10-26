export default class GenderDto {
	constructor(model) {
		this.id = model._id;
		this.name = model.name;
		this.create_at = model.create_at || null;
		this.update_at = model.update_at || null;
	}
}
