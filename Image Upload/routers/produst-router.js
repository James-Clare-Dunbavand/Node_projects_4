const uploadImage = require('../controlers/upload-controler.js');
const { getAllProducts, createProduct } = require('../controlers/product-controler.js');
const express = require('express');

const router = express.Router();


router.route('/')
	.post(createProduct)

router.route('/upload').post(uploadImage);
router.route('/products')
	.get(getAllProducts);



module.exports = router


