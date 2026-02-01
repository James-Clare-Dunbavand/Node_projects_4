const send = require('../controlers/mainControler.js');

const express = require('express');

const router = express.Router();


router.route('/send').get(send);


module.exports = router;
