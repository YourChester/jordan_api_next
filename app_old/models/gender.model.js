import { Schema, model } from 'mongoose';

const gender_schema = new Schema({
	name: {
		type: String,
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

export default model('GenderModel', gender_schema);
