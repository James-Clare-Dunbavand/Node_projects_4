
require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5223;
const router = require('./routers/mainRouter.js');
const errorHandler = require('./middleware/error-handler.js');



app.use(express.static('./public'));
app.use('/', router);





app.use(errorHandler);

const start = () => {

	try {
		app.listen(port, console.log('listening....'));
	} catch (error) {
		console.log(error);
	}
}
start();
