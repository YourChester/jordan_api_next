import { Schema, model } from 'mongoose';

const user_schema = new Schema(
	{
		login: {
			type: String,
			required: [true, 'Обязательное поле'],
		},
		name: {
			type: String,
			required: [true, 'Обязательное поле'],
		},
		password: {
			type: String,
			required: [true, 'Обязательное поле'],
		},
		role_id: {
			type: Schema.Types.ObjectId,
			required: [true, 'Обязательное поле'],
			ref: 'Role',
		},
		visibility: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

export default model('User', user_schema);
