import React, { useState, useEffect } from 'react';
import './task-card-component.css';
import { updateTaskCompletion } from '../../services/taskServices';
import { formatDueDate } from '../../utils/dateUtils';
import editIcon from '../../assets/icons/edit-icon.png';
import deleteIcon from '../../assets/icons/delete-icon.png';

function TaskCardComponent({
	title,
	description,
	dueDate,
	taskId,
	onEdit,
	onDelete,
	isCompleted,
	getTasks,
}) {
	const [completed, setCompleted] = useState(isCompleted);

	useEffect(() => {
		console.log('Initial isCompleted value:', isCompleted);
		setCompleted(isCompleted);
	}, [isCompleted]);

	const handleCardClick = async () => {
		try {
			const newCompletionStatus = !completed;

			setCompleted(newCompletionStatus);

			await updateTaskCompletion(taskId, newCompletionStatus);
			getTasks();
		} catch (error) {
			console.log(taskId);
			console.error('Error updating task completion:', error);
		}
	};

	return (
		<div className='card-container rounded-2xl border border-purple-300/50 h-[13rem] bg-gray-200/5 p-4 shadow-sm transition hover:shadow-md cursor-pointer flex flex-col justify-between'>
			<div>
				<div className='flex items-center gap-2 mb-2'>
					<button
						onClick={handleCardClick}
						className={`w-6 h-6 rounded-full border-2 transition-all ${
							completed ? 'bg-green-500 border-green-600' : 'bg-gray-200 border-gray-400'
						}`}
					>
						{completed && (
							<span className='text-white text-xs flex items-center justify-center'>✔</span>
						)}
					</button>
					<h3 className='text-base leading-5 font-semibold text-wrap w-[90%] truncate'>{title}</h3>
				</div>

				{description && <p className='text-sm text-gray-400 mb-2 line-clamp-2'>{description}</p>}
			</div>

			<div className='flex flex-row items-center justify-between mt-3'>
				<span className='text-xs text-gray-400 mt-1.5'>Due: {formatDueDate(dueDate)}</span>
				<div className='flex gap-2'>
					<button
						onClick={onEdit}
						className='text-purple-600 hover:text-purple-800'
					>
						<img
							src={editIcon}
							className='aspect-square w-4.5 cursor-pointer opacity-50 hover:opacity-100 transition-all duration-200'
							alt='edit-icon'
						/>
					</button>
					<button
						onClick={onDelete}
						className='text-red-600 hover:text-red-800'
					>
						<img
							src={deleteIcon}
							className='aspect-square w-4.5 cursor-pointer opacity-50 hover:opacity-100 transition-all duration-200'
							alt='delete-icon'
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default TaskCardComponent;
