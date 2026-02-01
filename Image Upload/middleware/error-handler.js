const { CustomError } = require('../errors');

const errorHandler = (err, req, res, next) => {

	console.log(err);
	if (err instanceof CustomError) {
		return res.status(err.statusCode).json({ message: err.message });
	}
	res.status(500).json({ message: "Something went wrong, try again.", err: err.message });
}

module.exports = errorHandler
