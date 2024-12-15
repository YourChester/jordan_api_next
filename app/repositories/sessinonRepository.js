import Session from '../models/sessionModel.js';

export default class SessionRepository {
	static async create(body) {
		const newSession = new Session(body);
		return await newSession.save();
	}
}
