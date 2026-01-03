const mongoose = require('mongoose');


const connect = (url) => {

	mongoose.connect(url)
	console.log('connected');

};

module.exports = connect;
