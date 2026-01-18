
class CustomAPIError extends Error {

	constructor(message) {
		super(message);
	}
}

const CreateCustomError = (statusCode, message) => {
	return new CustomAPIError(statusCode, message);
}

module.exports = { CustomAPIError, CreateCustomError };
