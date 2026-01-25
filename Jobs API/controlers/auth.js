const User = require('../models/user.js');
const { StatusCodes } = require('http-status-codes');
const { AuthenticationError, BadRequestError, UnauthenticatedError } = require('../errors');
const login = async (req, res) => {

	console.log(req.body);
	const { email, password } = req.body;

	if (!email || !password) {
		throw new AuthenticationError("Please provide username and password");
	}
	const user = await User.findOne({ email });

	if (!user) {
		throw new UnauthenticatedError("Invalid credentials");
	}
	const token = user.createJWT();
	if (!await user.compairePassword(password)) {
		throw new UnauthenticatedError("Invalid credentials");
	}
	// res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
	res.status(StatusCodes.OK).cookie("token", token, {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
		path: '/'
	}).json({ status: "ok" });
}

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({ user: { username: user.username }, token });
}



module.exports = { login, register }
