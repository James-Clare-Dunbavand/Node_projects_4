// Initialize Stripe.js
const stripe = Stripe('pk_test_51SwXKTBAAKbgsAJqR1mJ8u6nBKmZ8AzFdUaSmqyRD5eHFEgppS0j3W2UEXDuWhB7wKJclHJRNP1ybQcyYqHwQfXZ00YD7h6DEA');

const paymentForm = document.getElementById("payment-form");
let elements = null;
getCheckoutSecretAndMakeCheckout();

paymentForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const { error } = await stripe.confirmPayment({
		elements,
		confirmParams: {
			return_url: window.location.origin
		}
	});
	if (error) { console.log(error); }


})
// Fetch Checkout Session and retrieve the client secret
async function initialize() {
	const fetchClientSecret = async () => {
		const response = await fetch("/create-checkout-session", {
			method: "POST",
		});
		const { clientSecret } = await response.json();
		return clientSecret;
	};

	// Initialize Checkout
	const checkout = await stripe.initEmbeddedCheckout({
		fetchClientSecret,
	});

	// Mount Checkout
	checkout.mount('#checkout');
}

async function getCheckoutSecretAndMakeCheckout() {

	const response = await fetch("/checkout-secret", {
		method: "GET",
	})
	const { client_secret: clientSecret } = await response.json();
	const options = {
		clientSecret: clientSecret
	};
	elements = stripe.elements(options);
	const paymentElementOptions = { layout: 'accordion' };
	const paymentElement = elements.create('payment', paymentElementOptions);
	paymentElement.mount('#checkout');
}
