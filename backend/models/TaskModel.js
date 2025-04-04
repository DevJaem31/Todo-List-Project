const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		minlength: 3,
	},
	dueDate: {
		type: Date,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const TaskModel = mongoose.model('Tasks', taskSchema, 'TasklyTasks');

module.exports = TaskModel;
