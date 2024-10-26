import { Schema, model } from 'mongoose';

const role_schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		key: {
			type: String,
			unique: true,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model('Role', role_schema);
