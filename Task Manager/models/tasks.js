
const mongoose = require('mongoose');


const schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must contain name'],
		trim: true,
		maxLength: [20, "max length is 20 characters"]
	},
	completed: {
		type: Boolean,
		default: false
	}
})
const myTasks = mongoose.model('myTasks', schema);

module.exports = myTasks;
