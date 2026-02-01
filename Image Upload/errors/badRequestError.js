const CustomError = require('./customError.js');


class BadRequestError extends CustomError {

	constructor(message) {
		super(message);
		const statusCode = 400;
	}
}


module.exports = BadRequestError
