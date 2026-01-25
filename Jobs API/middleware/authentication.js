
const { AuthenticationError } = require('../errors');
const JWT = require('jsonwebtoken');

const auth = (req, res, next) => {
	const auth = req.headers.cookie;

	if (!auth || !auth.startsWith("token=")) {
		throw new AuthenticationError("Not logged in");
	}
	const token = auth.split("=")[1];


	try {
		const payload = JWT.verify(token, process.env.JWT_SECRET);
		req.user = { username: payload.username, userId: payload.userId }
		next();
	} catch (error) {
		throw new AuthenticationError("JWT token not valid");

	}
}

module.exports = auth
