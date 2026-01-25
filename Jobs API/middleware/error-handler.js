const { StatusCodes } = require('http-status-codes');
const { CustomAPIError } = require('../errors');


const errorHandler = (err, req, res, next) => {
	const customError = {
		statuseCode: err.statuseCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong try again."
	}

	if (err.name = "ValidationError") {
		if (err.errors) {
			customError.msg = Object.values(err.errors)
				.map((item) => item.message)
				.join(', ');
		}
		customError.statuseCode = StatusCodes.BAD_REQUEST;
	}

	if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value for ${Object.keys(err.keyValue)} field, try another`;
	}
	res.status(customError.statuseCode).json(customError.msg);
}

module.exports = errorHandler;
