require('dotenv').config();

const connectDB = require('./db/connectDB.js');
const Product = require('./models/products.js');


const jsonProducts = require('./products.json')


const start = async () => {

	try {
		await connectDB(process.env.MONGO_URI);
		console.log('connected')
		await Product.deleteMany();
		await Product.create(jsonProducts);
		console.log('populated');
		process.exit(0);
	} catch (error) {
		console.log(error)
		process.exit(1);
	}
}
start();
