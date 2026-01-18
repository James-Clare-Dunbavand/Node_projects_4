
const express = require('express');
const router = express.Router();
const { login, dashboard } = require('../controlers/main.js');
const authMiddleware = require('../middleware/auth.js');

router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login);

module.exports = router;
