

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const createCheckoutSession = async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [{
			price_data: {
				currency: 'usd',
				product_data: {
					name: 'T-shirt',
				},
				unit_amount: 2000,
			},
			quantity: 1,
		}],
		mode: 'payment',
		ui_mode: 'embedded',
		return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}'
	});

	res.send({ clientSecret: session.client_secret });
}

const createCheckoutSessionWithIntent = async (req, res) => {
	const intent = await stripe.paymentIntents.create({
		amount: 100,
		currency: 'eur',

	})
	res.status(200).json(intent);
}

module.exports = { createCheckoutSessionWithIntent, createCheckoutSession }
