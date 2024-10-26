import { Schema, model } from 'mongoose';

const role_schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	key: {
		type: String,
		unique: true,
		required: true,
	},
	create_at: {
		type: Date,
		required: true,
	},
	update_at: {
		type: Date,
	},
});

export default model('RoleModel', role_schema);
