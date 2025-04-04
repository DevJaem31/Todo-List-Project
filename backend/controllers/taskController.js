const TaskModel = require('../models/TaskModel');

const addTask = async (req, res) => {
	try {
		const { title, description, dueDate } = req.body;
		const userId = req.session.user.userId;

		console.log('Session userId:', userId);

		if (!title) {
			return res.status(400).json({ message: 'Title is required' });
		}

		const newTask = new TaskModel({
			title,
			description,
			completed: false,
			dueDate,
			userId,
		});

		await newTask.save();

		res.status(201).json({ message: 'Task created successfully', task: newTask });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error while adding task' });
	}
};

const fetchTasks = async (req, res) => {
	try {
		const userId = req.session.user.userId;

		const tasks = await TaskModel.find({ userId });

		res.status(200).json(tasks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error while fetching tasks' });
	}
};

const updateTaskCompletion = async (req, res) => {
	const { taskId } = req.params;
	const { completed } = req.body;

	console.log('Updating task completion:', taskId, completed);

	try {
		const task = await TaskModel.findByIdAndUpdate(taskId, { completed }, { new: true });

		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}

		return res.status(200).json(task);
	} catch (error) {
		console.error('Error updating task completion:', error);
		return res.status(500).json({ message: 'Failed to update task completion' });
	}
};

const deleteTask = async (req, res) => {
	const { taskId } = req.params;

	try {
		const task = await TaskModel.findByIdAndDelete(taskId);
		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}
		return res.status(200).json({ message: 'Task deleted successfully' });
	} catch (error) {
		console.error('Error deleting task:', error);
		return res.status(500).json({ message: 'Failed to delete task' });
	}
};

const fetchSpecificTask = async (req, res) => {
	const { taskId } = req.params;

	try {
		const task = await TaskModel.findById(taskId);
		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}
		return res.status(200).json(task);
	} catch (error) {
		console.error('Error fetching specific task:', error);
		return res.status(500).json({ message: 'Failed to fetch task' });
	}
};

const updateTask = async (req, res) => {
	const { taskId } = req.params;
	const { title, description, dueDate } = req.body;

	try {
		const task = await TaskModel.findByIdAndUpdate(
			taskId,
			{ title, description, dueDate },
			{ new: true },
		);

		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}

		return res.status(200).json(task);
	} catch (error) {
		console.error('Error updating task:', error);
		return res.status(500).json({ message: 'Failed to update task' });
	}
};

module.exports = {
	addTask,
	updateTaskCompletion,
	fetchTasks,
	deleteTask,
	fetchSpecificTask,
	updateTask,
};
