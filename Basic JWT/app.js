
require('express-async-errors');
const express = require('express');
const app = express();
const pathNotFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
require('dotenv').config();
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mainRouter = require('./routers/main.js');

const port = process.env.PORT || 3500;

app.use('/api/v1', mainRouter);

app.use(pathNotFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = () => {
	try {
		app.listen(port, console.log(`listening on port ${port}`));
	} catch (error) {
		console.log(error)
	}
}
start();
