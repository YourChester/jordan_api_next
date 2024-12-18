import RoleDto from './roleDto.js';

export default class UserDto {
	constructor(user, withPassword = false) {
		this.id = user._id;
		this.login = user.login;
		this.name = user.name;
		this.role_id = user.role_id;
		this.updatedAt = user.updatedAt;
		this.createdAt = user.createdAt;

		if (withPassword) {
			this.password = user.password;
		}

		if (user.role && user.role.length) {
			this.role = new RoleDto(user.role[0]);
		}
	}
}
