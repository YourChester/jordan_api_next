import express from 'express';
import expressFileupload from 'express-fileupload';
import cors from 'cors';
import dotenv from 'dotenv';

import create_connect_to_database from './database/index.js';
import error_middleware from './middlewares/error.middleware.js';
import router from './router/index.js';

dotenv.config();
const PORT = process.env.APP_PORT || 3000;
const DB_URL = process.env.APP_DB_URL || '';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(expressFileupload({}));

app.use('/api/', router);

app.use(error_middleware);

create_connect_to_database(DB_URL)
	.then(() => {
		app.listen(PORT);
		console.log(`Сервер запущен на: http://localhost:${PORT}/`);
	})
	.catch((error) => {
		console.log(error);
	});
