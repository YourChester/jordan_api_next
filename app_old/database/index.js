import mongoose from 'mongoose';

async function create_connect_to_database(db_url) {
	if (!db_url) {
		throw 'Отсутствует URL для подключение к базе';
	}
	return await mongoose.connect(db_url);
}

export default create_connect_to_database;
