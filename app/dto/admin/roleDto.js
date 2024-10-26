export default class RoleDto {
  constructor(role) {
    this.id = role._id
    this.name = role.name
    this.key = role.key
    this.updatedAt = role.updatedAt
    this.createdAt = role.createdAt
  }
}