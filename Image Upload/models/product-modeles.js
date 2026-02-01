const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide item name"]
	},
	price: {
		type: Number,
		required: [true, "Please provide price"]
	},
	image: {
		type: String,
		require: [true, "Please provide item image"]
	}

})
const ProductModel = mongoose.model("ProductModel", ProductSchema);

module.exports = ProductModel;
