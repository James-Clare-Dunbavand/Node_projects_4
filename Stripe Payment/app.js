
require('dotenv').config({ quiet: true });
const express = require('express');
const app = express();
const router = require('./routers/router.js');
const port = process.env.PORT || 5224;
app.use(express.static('./public'));


app.use('/', router);

const start = () => {
	app.listen(port, console.log("listening..."));
}
start();
