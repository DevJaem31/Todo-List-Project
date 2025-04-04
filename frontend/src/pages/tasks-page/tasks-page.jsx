import React, { useState, useEffect } from 'react';
import './tasks-page.css';
import NoTaskImg from '../../assets/taskly-resources/no-task-image.png';
import { fetchTasks, deleteTask } from '../../services/taskServices';
import toast from 'react-hot-toast';

const TaskCardComponent = React.lazy(() =>
	import('../../components/task-card-reusable/task-card-component'),
);
const ConfirmationModal = React.lazy(() =>
	import('../../components/confirmation-modal/confirmation-modal'),
);
const EditTaskModal = React.lazy(() => import('../../components/edit-task-modal/edit-task-modal'));
const AddTaskModal = React.lazy(() => import('../../components/add-task-modal/add-task-modal'));

function TasksPage() {
	const [showAddTaskModal, setShowAddTaskModal] = useState(false);
	const [showEditTaskModal, setShowEditTaskModal] = useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [taskIdToDelete, setTaskIdToDelete] = useState(null);
	const [taskIdToEdit, setTaskIdToEdit] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleAddTaskClick = () => {
		setShowAddTaskModal(true);
	};

	const handleEditTaskClick = (taskId) => {
		setTaskIdToEdit(taskId);
		setShowEditTaskModal(true);
	};

	const handleCloseModal = () => {
		setShowAddTaskModal(false);
	};

	const getTasks = async () => {
		try {
			const tasks = await fetchTasks();

			const sortedTasks = tasks
				.filter((task) => !task.completed)
				.sort((a, b) => {
					const dueDateA = new Date(a.dueDate);
					const dueDateB = new Date(b.dueDate);
					return dueDateA - dueDateB;
				});

			setTasks(sortedTasks);
		} catch (error) {
			console.error('Error fetching task:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getTasks();
	}, []);

	const handleDeleteTaskClick = (taskId) => {
		setShowConfirmationModal(true);
		setTaskIdToDelete(taskId);
	};

	const handleDeleteTask = async (taskId) => {
		try {
			await deleteTask(taskId);
			toast.success('Task deleted successfully!');
			getTasks();
		} catch (error) {
			console.error('Error deleting task:', error);
		} finally {
			setShowConfirmationModal(false);
		}
	};

	return (
		<div className='tasks-page-container relative h-[85vh] p-4 mt-2 rounded-lg shadow-lg'>
			<h1 className='text-3xl w-[100%] border-b-2 pb-2 border-purple-500/10 font-bold tracking-widest'>
				Tasks Page
			</h1>

			<div className='add-task-floater absolute bottom-2 right-2 flex items-center justify-center  '>
				<button
					onClick={handleAddTaskClick}
					className='add-task-button text-xl bg-purple-500/20 rounded-full px-5 py-2 hover:bg-purple-700/20 transition-all 0.15s ease-in-out cursor-pointer font-semibold'
				>
					&#10011; Add Task
				</button>
			</div>

			<div className='task-list-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5'>
				{loading ? (
					[...Array(6)].map((_, index) => (
						<div
							key={index}
							className='animate-pulse rounded-2xl border border-purple-300 h-[13rem] bg-gray-200/5 p-4 shadow-sm flex flex-col justify-between'
						>
							<div>
								<h3 className='h-4 w-24 bg-gray-300 rounded-md mb-2'></h3>
								<p className='h-4 w-32 bg-gray-300 rounded-md mb-2'></p>
							</div>

							<div className='flex items-center justify-between mt-3'>
								<span className='h-4 w-16 bg-gray-300 rounded-md'></span>
								<div className='flex gap-2'>
									<button className='h-4 w-16 bg-gray-300 rounded-md'></button>
									<button className='h-4 w-16 bg-gray-300 rounded-md'></button>
								</div>
							</div>
						</div>
					))
				) : tasks.length > 0 ? (
					tasks.map((task, index) => (
						<TaskCardComponent
							getTasks={getTasks}
							taskId={task._id}
							isCompleted={task.completed}
							key={index}
							title={task.title}
							description={task.description}
							dueDate={task.dueDate}
							onDelete={() => handleDeleteTaskClick(task._id)}
							onEdit={() => handleEditTaskClick(task._id)}
						/>
					))
				) : (
					<div className='no-tasks-container flex flex-col w-[100%] h-[70vh] col-span-3 items-center justify-center'>
						<img
							src={NoTaskImg}
							alt='No Tasks'
							className='w-[30%] mb-4 opacity-50'
						/>
						<h2 className='text-xl font-bold text-gray-700'>No Tasks Available</h2>
					</div>
				)}
			</div>

			{showAddTaskModal && (
				<AddTaskModal
					handleCloseModal={handleCloseModal}
					getTasks={getTasks}
				/>
			)}

			{showConfirmationModal && (
				<ConfirmationModal
					handleCloseModal={() => setShowConfirmationModal(false)}
					handleDeleteTask={() => handleDeleteTask(taskIdToDelete)}
				/>
			)}

			{showEditTaskModal && (
				<EditTaskModal
					handleCloseModal={() => setShowEditTaskModal(false)}
					getTasks={getTasks}
					taskId={taskIdToEdit}
				/>
			)}
		</div>
	);
}

export default TasksPage;
