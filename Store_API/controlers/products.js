const Product = require('../models/products.js');

const defaultPageLimit = 10;
const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({ price: { $gte: 30 } }).sort('price');
	res.status(200).json({ products, nbHits: products.length });
}
const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, field, numericFilters } = req.query;
	const queryObject = {};
	if (featured) {
		queryObject.featured = featured === 'true' ? true : false;
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}
	if (numericFilters) {
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=': '$eq',
			'<=': '$lte',
			'<': '$lt',

		}
		const regex = /\b(>|>=|=|<|<=)\b/g;

		const filterOptions = ['price', 'rating']
		const filters = numericFilters.replace(regex, (symbol) => `-${operatorMap[symbol]}-`)
		filters = filters.split(',').forEach((f) => {
			const [name, operator, value] = f.split('-');
			if (filterOptions.includes(name)) {
				queryObject[name] = { [operator]: Number(value) }
			}

		})
		console.log(queryObject)


	}

	let result = Product.find(queryObject);

	if (field) {
		const fieldList = field.split(',').join(' ');
		result = result.select(fieldList);
	}
	if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	}
	else {
		result = result.sort('createdAt');
	}

	const limit = Number(req.query.limit) || defaultPageLimit;
	const page = Number(req.query.page) || 1;
	result = result.skip((page - 1) * limit).limit(limit);

	const products = await result;
	res.status(200).json({ products, nbHits: products.length });
}


module.exports = { getAllProducts, getAllProductsStatic }
