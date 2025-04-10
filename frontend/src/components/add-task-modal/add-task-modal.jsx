import React, { useState } from 'react';
import './add-task-modal.css';
import { getTodayDate } from '../../utils/dateUtils';
import { addTask } from '../../services/taskServices';
import { toast } from 'react-hot-toast';

function AddTaskModal({ handleCloseModal, getTasks }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState(getTodayDate());

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const taskData = {
				title,
				description,
				dueDate,
			};

			await addTask(taskData);
			toast.success('Task added successfully!');
			getTasks();
			handleCloseModal();
		} catch (error) {
			console.error('Failed to add task:', error);
		}
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
			<div className='relative bg-[var(--background-color)] text-white rounded-lg shadow-xl p-6 w-[45%] modal-container'>
				<button
					onClick={handleCloseModal}
					className='absolute top-3 right-3 text-gray-400 hover:text-gray-200 cursor-pointer transition duration-200'
				>
					&#10005;
				</button>
				<h2 className='text-2xl font-bold mb-4 text-purple-400'>Add Task</h2>
				<form
					className='flex flex-col gap-4'
					onSubmit={handleSubmit}
				>
					<input
						type='text'
						placeholder='Task Title'
						required
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none'
					/>

					<textarea
						placeholder='Task Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none h-24'
					></textarea>

					<input
						type='date'
						value={dueDate}
						min={getTodayDate()}
						onChange={(e) => setDueDate(e.target.value)}
						className='bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none cursor-pointer'
					/>

					<button
						type='submit'
						className='bg-purple-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-700 transition-all duration-200 font-semibold'
					>
						Add Task
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddTaskModal;
