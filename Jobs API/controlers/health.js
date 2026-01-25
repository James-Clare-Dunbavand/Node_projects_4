const mongoose = require('mongoose');
const ping = (req, res) => {
	const state = mongoose.connection.readyState
	console.log(state);
	res.json({ ping: state });

}

module.exports = { ping }
