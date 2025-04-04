import React, { useState, useEffect } from 'react';
import splashLoading from '../../assets/taskly-resources/loading.gif';
import './splash-component.css';

function SplashComponent({ onFinish }) {
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setFadeOut(true);
			setTimeout(() => {
				onFinish();
			}, 300);
		}, 4500);
	}, [onFinish]);

	return (
		<div className={`loading-container ${fadeOut ? 'fade-out' : ''}`}>
			<img
				src={splashLoading}
				className='loading-img h-[45%]'
				alt='Loading...'
			/>
		</div>
	);
}

export default SplashComponent;
