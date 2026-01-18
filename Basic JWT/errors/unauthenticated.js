const { CustomAPIError } = require('./custom-errors.js');
const { StatusCodes } = require('http-status-codes');


class UnauthenticatedError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

module.exports = UnauthenticatedError;
