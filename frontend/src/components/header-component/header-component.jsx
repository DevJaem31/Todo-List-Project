import React from 'react';
import './header-component.css';
import TasklyLogo from '../../assets/taskly-resources/taskly-logo.png';

function HeaderComponent() {
	return (
		<div>
			<div className='header-component-img m-auto flex flex-col rounded-lg justify-center items-center'>
				<img
					src={TasklyLogo}
					className='header-component-logo ml-5 mt-[-2.5rem] mb-[-2.5rem] aspect-ratio-1/1 h-[250px]'
					alt=''
				/>
			</div>
		</div>
	);
}

export default HeaderComponent;
