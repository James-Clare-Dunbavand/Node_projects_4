const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const helloWorld = (req, res) => res.send('helloworld');
const mongoose = require('mongoose');
const Job = require('../models/jobs.js');

const getJob = async (req, res) => {
	const { jobId } = req.params;
	if (!jobId) {
		throw new BadRequestError("Please provide a job id.")
	}
	const queryObject = { _id: jobId, createdBy: req.user.userId }
	const job = await Job.findOne(queryObject);
	if (!job) {
		throw new NotFoundError("Job not found");
	}
	res.status(StatusCodes.OK).json(job);
}
const getAllJobs = async (req, res) => {
	const { company, position, status, numericFilters } = req.query;
	const queryObject = { createdBy: req.user.userId };


	if (company) {
		queryObject.company = company;
	}
	if (position) {
		queryObject.position = position;
	}
	if (status) {
		queryObject.status = status;
	}


	const jobs = await Job.find(queryObject).sort('createdAt');
	res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}
const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;

	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json(job);

}
const deleteJob = async (req, res) => {
	const { user: { userId }, params: { id: jobId } } = req;
	if (!jobId) {
		throw new BadRequestError("Please provide job id");
	}
	const deletedJob = await Job.deleteOne({ _id: jobId, createdBy: userId });
	if (!deletedJob) {
		throw BadRequestError("No job with that id");
	}

	res.status(StatusCodes.OK).json({ message: "job deleted ", deletedJob });
}
const modifyJob = async (req, res) => {
	const { body: { company, position, status }, params: { id: jobId }, user: { userId } } = req;
	console.log(company, position, status, jobId, userId)

	if (!jobId) {
		throw new BadRequestError("Please provide id")
	}
	if (!company && !position && !status) {
		throw new BadRequestError("Provide a field to update");
	}
	if (company === "" || position === "") {
		throw new BadRequestError("company or position can't be empty");
	}
	const newJob = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, { company: company, position: position, status: status }, { new: true });
	if (!newJob) {
		throw new NotFoundError(`No jobs found with id ${id}`);
	}
	res.status(StatusCodes.OK).json(newJob);

}


module.exports = { getJob, getAllJobs, createJob, deleteJob, modifyJob }
