const express = require('express');
const { login, register } = require('../controlers/auth.js');
const authRouter = express.Router();


authRouter.route('/login').post(login);
authRouter.route('/register').post(register);

module.exports = authRouter;
