import React, { useEffect, useState } from 'react';
import './side-bar-component.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { fetchUser, Logout } from '../../services/authServices';

function SidebarComponent() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [initials, setInitials] = useState('');
	const [showProfile, setShowProfile] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const getUser = async () => {
			try {
				const user = await fetchUser();
				setUsername(user?.username || '');
				setEmail(user?.email || '');
				setInitials(generateInitials(user?.username || ''));
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};
		getUser();
	}, []);

	const showProfileModal = () => {
		setShowProfile(!showProfile);
	};

	const generateInitials = (name) => {
		if (!name) return '';
		const nameParts = name.trim().split(' ');
		return nameParts.map((part) => part[0].toUpperCase()).join('');
	};

	const handleLogout = async () => {
		try {
			await Logout();

			navigate('/login');
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	return (
		<div className='side-bar-component flex flex-col items-start space-x-3 h-[85vh]  p-4 mt-2 rounded-lg shadow-lg'>
			<div
				className='account-container border-b-2 w-[100%] pb-3 border-violet-500/10 flex items-center gap-3 onClick cursor-pointer'
				onClick={showProfileModal}
			>
				<div className='w-8 h-8 flex items-center justify-center bg-purple-700 rounded-full text-lg font-bold select-none'>
					{initials || 'U'}
				</div>
				<h1 className='text-base font-semibold select-none username-text transition-all .3s ease-in-out'>
					{username}
				</h1>
			</div>

			<div className='nav-list mt-5 w-[100%]'>
				<ul className='flex flex-col gap-5 mt-4 w-[100%]'>
					<li
						className={`text-sm w-[100%] px-5 py-2 rounded-sm cursor-pointer transition duration-300 ease-in-out ${
							location.pathname === '/home/tasks'
								? 'bg-purple-500/20 text-purple-500 font-bold'
								: 'text-gray-400 hover:text-purple-500 hover:bg-purple-500/20'
						}`}
					>
						<Link
							to='/home/tasks'
							className='w-[100%] block'
						>
							Tasks
						</Link>
					</li>
					<li
						className={`text-sm w-[100%] px-5 py-2 rounded-sm cursor-pointer transition duration-300 ease-in-out ${
							location.pathname === '/home/completed-task'
								? 'bg-purple-500/20 text-purple-500 font-bold'
								: 'text-gray-400 hover:text-purple-500 hover:bg-purple-500/20'
						}`}
					>
						<Link
							to='/home/completed-task'
							className='w-[100%] block'
						>
							Completed Tasks
						</Link>
					</li>
				</ul>
			</div>

			<div className='footer absolute bottom-12'>
				<p className='opacity-30 text-xs  '>Contact: johnmarkflameno@gmail.com</p>
			</div>
			{showProfile && (
				<div className='profile-modal absolute top-35 left-85 bg-gray-600 shadow-lg rounded-lg p-4 mt-2'>
					<p className='text-lg font-semibold '>{username}</p>
					<p className='text-sm text-gray-400'>{email}</p>
					<button
						className='mt-2 text-white-500 mt-10 z-10 py-1 px-5 rounded bg-purple-500 cursor-pointer hover:bg-purple-600/50 transition duration-300 ease-in-out'
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}

export default SidebarComponent;
