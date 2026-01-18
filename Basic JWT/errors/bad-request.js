const { CustomAPIError } = require('./custom-errors.js');
const { StatusCodes } = require('http-status-codes');

class BadRequestError extends CustomAPIError {

	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}


module.exports = BadRequestError;
