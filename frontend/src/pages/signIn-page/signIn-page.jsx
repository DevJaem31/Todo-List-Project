import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signIn-page.css';
import { toast } from 'react-hot-toast';

import HeaderComponent from '../../components/header-component/header-component';
import InputField from '../../components/reusable-components/input-fields-components';
import FooterComponent from '../../components/footer-component/footer-component';
import { Login } from '../../services/authServices';

function SignInPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await Login(email, password);
			console.log(response);

			toast.success('Login successful!');
			navigate('/home/tasks');
		} catch (error) {
			setError(error?.message || 'Login failed. Please try again.');
			console.error('Login Error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='signIn-page-container '>
			<div className='header-login-container'>
				<HeaderComponent />
			</div>

			<div className='signIn-page-content mt-[5.5rem] w-[35%] h-[35rem] flex flex-col gap-1 m-auto'>
				<div className='signIn-page-header-container flex flex-col pt-10 gap-1'>
					<h1 className='signIn-page-header text-3xl text-center font-bold tracking-widest'>
						Welcome back!
					</h1>
					<p className='signIn-page-subheader mb-5 font-bold text-center text-xs tracking-widest w-[80%] m-auto'>
						Please sign in to continue
					</p>
				</div>

				<div className='form-container-signIn flex flex-col gap-5 mt-5'>
					<form
						onSubmit={handleLogin}
						className='flex flex-col gap-5'
					>
						<InputField
							label={'EMAIL'}
							type={'text'}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onFocus={() => setError(null)}
						/>

						<InputField
							label={'PASSWORD'}
							type={'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onFocus={() => setError(null)}
						/>

						{error && (
							<p className='text-red-500 text-center font-semibold tracking-widest'>{error}</p>
						)}

						<button
							type='submit'
							className='px-10 mt-5 cursor-pointer font-semibold tracking-widest py-2 rounded-sm bg-[var(--accent-border)] border-none hover:opacity-75 transition-all duration-200 ease-out'
							disabled={loading}
						>
							{loading ? 'Loading...' : 'Sign In'}
						</button>
					</form>
				</div>

				<div className='login-account-container gap-2 w-fit m-auto mt-3'>
					<p className='text-sm font-semibold tracking-widest'>
						Don't have an account?{' '}
						<a
							href='/'
							className='hover:text-[var(--accent-border)] transition-all duration-200 ease-out'
						>
							Sign Up
						</a>
					</p>
				</div>
			</div>

			<div className='footer-sign-up-container'>
				<FooterComponent />
			</div>
		</div>
	);
}

export default SignInPage;
