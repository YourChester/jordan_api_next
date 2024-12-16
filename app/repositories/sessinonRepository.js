import Session from '../models/sessionModel.js';

export default class SessionRepository {
	static create() {
		return new Session();
	}

	static async save(session) {
		return await session.save();
	}

	static async getOne(id) {
		return await Session.findById(id);
	}

	static async findOne(params) {
		return await Session.findOne(params);
	}

	static async delete(id) {
		return await Session.findByIdAndDelete(id);
	}
}
