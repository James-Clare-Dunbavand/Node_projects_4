
const express = require('express');
const jobsRouter = express.Router();
const { getJob, createJob, deleteJob, modifyJob, getAllJobs } = require('../controlers/jobs.js');
const { ping } = require('../controlers/health.js');



jobsRouter.route('/ping').get(ping);

jobsRouter.route('/')
	.get(getAllJobs)
	.post(createJob)

jobsRouter.route('/:id')
	.get(getJob)
	.delete(deleteJob)
	.patch(modifyJob);



module.exports = jobsRouter;
