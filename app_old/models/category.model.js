import { Schema, model } from 'mongoose';

const category_schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	parent: {
		type: Schema.Types.ObjectId,
		ref: 'CategoryModel',
		default: null,
	},
	create_at: {
		type: Date,
		required: true,
	},
	update_at: {
		type: Date,
	},
});

export default model('CategoryModel', category_schema);
