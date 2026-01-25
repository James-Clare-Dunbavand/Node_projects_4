const express = require('express');
require('dotenv').config();
require('express-async-errors');

const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3777;

const jobsRouter = require('./routes/jobs.js');
const authRouter = require('./routes/auth.js');

const auth = require('./middleware/authentication.js');
const notFound = require('./middleware/not-found.js');
const errorHandler = require('./middleware/error-handler.js');

const connectDB = require('./db/connectdb.js');


app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.set('trust proxy', 1);
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000,
	max: 100
}));


app.use(express.static("./public"));
app.use('/api/v1/jobs', auth, jobsRouter);
app.use('/api/v1/auth', authRouter);


app.use(notFound);
app.use(errorHandler);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Listening on port ${port}...`));

	} catch (error) {
		console.log("App start FAILED", error);

	}
}
start();

