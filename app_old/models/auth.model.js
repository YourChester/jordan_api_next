import { Schema, model } from 'mongoose';

const auth_schema = new Schema({
	user_id: String,
	token: String,
	refresh_token: String,
});

export default model('AuthModel', auth_schema);
