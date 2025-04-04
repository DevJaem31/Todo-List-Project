const express = require('express');
const router = express.Router();
const {
	addTask,
	fetchTasks,
	updateTaskCompletion,
	deleteTask,
	fetchSpecificTask,
	updateTask,
} = require('../controllers/taskController');

router.post('/add-task', addTask);
router.get('/fetch-tasks', fetchTasks);
router.patch('/tasks-completed/:taskId', updateTaskCompletion);
router.delete('/delete-task/:taskId', deleteTask);
router.get('/fetch-tasks/:taskId', fetchSpecificTask);
router.patch('/update-task/:taskId', updateTask);

module.exports = router;
