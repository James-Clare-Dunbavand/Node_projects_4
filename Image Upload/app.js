require('dotenv').config({ quiet: true });
const port = process.env.PORT || 5222;
const express = require('express');
require('express-async-errors');
const connectDB = require('./db/connectDB.js');
const errorHandler = require('./middleware/error-handler.js');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
})


const app = express();
app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());

const router = require('./routers/produst-router.js');

app.use('/', router);



app.use(errorHandler);

const start = () => {
	try {
		connectDB(process.env.MONGO_URI);
		app.listen(port, console.log("listening"));

	} catch (error) {
		console.log(error);
	}
}
start();
