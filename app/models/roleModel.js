import { Schema, model } from 'mongoose';

const role_schema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Обязательное поле'],
		},
		key: {
			type: String,
			required: [true, 'Обязательное поле'],
		},
	},
	{ timestamps: true }
);

export default model('Role', role_schema);
