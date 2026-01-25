const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
	company: {
		type: String,
		required: [true, "Please provide company name"],
		maxlength: 50
	},
	position: {
		type: String,
		required: [true, "Please provide position"],
		maxlength: 100
	},
	status: {
		type: String,
		enum: ['interview', 'declined', 'pending'],
		default: 'pending',
		set: v => (v === "" || v == null ? undefined : v)
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user']

	}
}, { timestamps: true })

const Job = mongoose.model('job', JobSchema);

module.exports = Job;
