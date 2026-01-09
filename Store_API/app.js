const express = require('express');
require('dotenv').config();
require('express-async-errors');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error-handler.js');
const connectDB = require('./db/connectDB.js');
const productsRouter = require('./routes/products.js');

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('<h1>Home Page</h1><a href="/api/v1/products">products route</a>'));

app.use('/api/v1/products', productsRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Listening on port ${port}...`));

	} catch (error) {
		console.log(error);
	}
}
start();



