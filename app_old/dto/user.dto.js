import RoleDto from './role.dto.js';

export default class UserDto {
	constructor(model, set_password = false) {
		if (set_password) {
			this.password = model.password;
		}
		this.id = model._id;
		this.login = model.login;
		this.name = model.name;
		this.role = model.role ? new RoleDto(model.role) : null;
		this.visibility = model.visibility;
		this.create_at = model.create_at;
		this.update_at = model.update_at || null;
	}
}
