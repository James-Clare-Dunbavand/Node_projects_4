const express = require('express');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000
const connect = require('./db/connectDB.js');
const router = require('./routers/tasks-router.js');
const notFound = require('./middleware/not-found.js');
const errorHandler = require('./middleware/error-handler.js');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/tasks', router);

app.use(notFound);
app.use(errorHandler);


const start = async () => {

	try {

		connect(process.env.MONGOOSE_URI);
		app.listen(port, console.log(`connected on port ${port}`));
	} catch (error) {
		console.log(error)

	}

}
start();


