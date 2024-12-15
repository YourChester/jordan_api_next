import { Schema, model } from 'mongoose';

const session_schema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		token: {
			type: String,
		},
		refresh_token: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default model('Session', session_schema);
