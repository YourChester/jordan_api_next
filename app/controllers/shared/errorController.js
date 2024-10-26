export default class ErrorController extends Error {
	constructor(status, message, errors = null) {
		super();
		this.status = status;
		this.message = message;
		this.errors = errors;
	}

	static bad_request(message) {
		return new ErrorController(400, message);
	}

	static unauthorized(message) {
		return new ErrorController(401, message);
	}

	static forbidden(message) {
		return new ErrorController(403, message);
	}

	static not_found(message) {
		return new ErrorController(404, message);
	}

	static unprocessable_entity(errors = null) {
		return new ErrorController(422, 'Unprocessable entity', errors);
	}
}
