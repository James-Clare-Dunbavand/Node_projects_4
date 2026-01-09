const CustomAPIError = 'todo';

const errorMiddleware = (err, req, res, next) => {

	// if (err instanceof CustomAPIError) {
	// 	return res.status(err.statusCode).json({ err: err.message });
	// }
	console.log(err);
	res.status(500).send('Something went wrong try again');
}

module.exports = errorMiddleware;
