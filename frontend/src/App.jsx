import React, { useState, useEffect } from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/routes';
import SplashComponent from './components/splash-component/splash-component';

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const hasShownSplash = sessionStorage.getItem('hasShownSplash');

		if (hasShownSplash) {
			setLoading(false);
		} else {
			setTimeout(() => {
				setLoading(false);
				sessionStorage.setItem('hasShownSplash', 'true');
			}, 5000);
		}
	}, []);

	return loading ? (
		<SplashComponent onFinish={() => setLoading(false)} />
	) : (
		<div className='main-app-container'>
			<AppRoutes />

			<Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{
					className: '',
					duration: 5000,
					style: {
						background: '#333',
						color: '#fff',
					},
				}}
			/>
		</div>
	);
}

export default App;
