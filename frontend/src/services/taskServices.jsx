import axios from 'axios';

const API_URL = 'https://todo-list-project-dsuz.onrender.com';

export const addTask = async (task) => {
	try {
		const response = await axios.post(`${API_URL}/add-task`, task, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error adding task:', error);
		throw error;
	}
};

export const fetchTasks = async () => {
	try {
		const response = await axios.get(`${API_URL}/fetch-tasks`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching tasks:', error);
		throw error;
	}
};

export const updateTaskCompletion = async (taskId, isCompleted) => {
	console.log('Sending request to update task completion:', taskId, isCompleted);

	try {
		const response = await axios.patch(`${API_URL}/tasks-completed/${taskId}`, {
			completed: isCompleted,
		});

		console.log('Task completion updated:', taskId, isCompleted);
		return response.data;
	} catch (error) {
		console.error('Error updating task completion:', error);
		throw error;
	}
};

export const deleteTask = async (taskId) => {
	try {
		const response = await axios.delete(`${API_URL}/delete-task/${taskId}`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error deleting task:', error);
		throw error;
	}
};

export const fetchSpecificTask = async (taskId) => {
	try {
		const response = await axios.get(`${API_URL}/fetch-tasks/${taskId}`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching specific task:', error);
		throw error;
	}
};

export const updateTask = async (taskId, task) => {
	try {
		const response = await axios.patch(`${API_URL}/update-task/${taskId}`, task, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error updating task:', error);
		throw error;
	}
};
