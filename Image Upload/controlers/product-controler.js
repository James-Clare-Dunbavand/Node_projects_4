const ProductModel = require('../models/product-modeles.js');
const { BadRequestError } = require('../errors');

const createProduct = async (req, res) => {
	const { name, price, image } = req.body;
	console.log(req.body);

	if (!name || !price || !image) {
		throw new BadRequestError("Please provide all product information");
	}
	const product = await ProductModel.create({ name: name, price: price, image: image });
	res.status(201).json(product);

}
const getAllProducts = async (req, res) => {

	const products = await ProductModel.find({});
	console.log(products);
	res.status(200).json({ products: products });

}


module.exports = { createProduct, getAllProducts }
