
const { createCheckoutSession, createCheckoutSessionWithIntent } = require('../controlers/paymentControler.js');

const express = require('express');

const router = express.Router();

router.route('/create-checkout-session').post(createCheckoutSession);
router.route("/checkout-secret").get(createCheckoutSessionWithIntent);



module.exports = router
