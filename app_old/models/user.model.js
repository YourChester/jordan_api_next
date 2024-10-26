import { Schema, model } from 'mongoose';

const user_schema = new Schema({
	login: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'RoleModel',
	},
	visibility: {
		type: Boolean,
		default: true,
	},
	create_at: {
		type: Date,
		required: true,
	},
	update_at: {
		type: Date,
	},
});

export default model('UserModel', user_schema);
