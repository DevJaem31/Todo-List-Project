import React from 'react';
import { Outlet } from 'react-router-dom';
import './home-page.css';
import SidebarComponent from '../../components/side-bar-component/side-bar-component';

function HomePage() {
	return (
		<div>
			<div className='header-home-container flex flex-col rounded-lg justify-center items-center'>
				<h1 className='text-3xl text-center font-bold tracking-widest'>Welcome to Taskly</h1>
			</div>

			<div className='container-home-content grid grid-cols-5'>
				<div className='col-span-1'>
					<div className='sidebar-component'>
						<SidebarComponent />
					</div>
				</div>

				<div className='col-span-4'>
					{/* Main Content */}
					<div className='main-content'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
