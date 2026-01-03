const Task = require('../models/tasks.js');
const asyncWraper = require('../middleware/async.js');
const { CreateCustomError } = require('../errors/custom-error.js')


const getTasks = asyncWraper(async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json(tasks);
})

const postNewTask = asyncWraper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ success: true, task });
})
const getTask = asyncWraper(async (req, res, next) => {
	const { taskID: taskID } = req.params;
	console.log(taskID);
	const task = await Task.findOne({ _id: taskID });
	if (!task) {
		const error = CreateCustomError(`task does not exist ${taskID}`, 404);
		return next(error);
		return res.status(200).json({ success: false, msg: 'task does not exist' });
	}
	res.status(201).json(task);

})


const modifyTask = asyncWraper(async (req, res) => {
	const { taskID: taskID } = req.params;
	const task = await Task.updateOne({ _id: taskID }, {
		$set: req.body
	}, { new: true, runValidators: true }

	);
	if (!task) {
		return res.status(200).json({ success: false, msg: 'task does not exist' });
	}
	res.status(201).json(task);

})

const deleteTask = asyncWraper(async (req, res) => {
	const { taskID } = req.params;
	const task = await Task.deleteOne({ _id: taskID });
	if (!task) {
		return res.status(200).json({ success: false, msg: 'task does not exist' });
	}
	res.status(201).send('task deleted');
})



module.exports = { getTasks, postNewTask, getTask, modifyTask, deleteTask };
