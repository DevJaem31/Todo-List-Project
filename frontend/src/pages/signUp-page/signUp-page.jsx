import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signUp-page.css';
import HeaderComponent from '../../components/header-component/header-component';
import InputField from '../../components/reusable-components/input-fields-components';
import FooterComponent from '../../components/footer-component/footer-component';
import { Register } from '../../services/authServices';
import { toast } from 'react-hot-toast';

function SignUpPage() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			return setError('Passwords do not match');
		}
		setLoading(true);
		try {
			await Register(formData);
			toast.success('Signup successful');

			setFormData({
				username: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
			navigate('/login');
		} catch (err) {
			setError(err.message || 'Signup failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='sign-up-page-container'>
			<div className='header-sign-up-container'>
				<HeaderComponent />
			</div>

			<div className='form-container mt-[2.5rem] w-[35%]  flex flex-col m-auto'>
				<div className='welcome-container flex flex-col gap-1'>
					<h1 className='text-3xl text-center font-bold tracking-widest'>SIGN UP</h1>
					<h1 className='mb-2 font-bold text-center text-xs tracking-widest w-[80%] m-auto'>
						Welcome to Taskly! A to-do application to organize your tasks efficiently.
					</h1>
				</div>

				<div className='form-main-container '>
					<form
						onSubmit={handleSubmit}
						className='flex flex-col gap-5'
					>
						<InputField
							label={'USERNAME: '}
							type={'text'}
							name='username'
							value={formData.username}
							onChange={handleChange}
						/>

						<InputField
							label={'EMAIL: '}
							type={'email'}
							name='email'
							value={formData.email}
							onChange={handleChange}
						/>

						<InputField
							label={'PASSWORD: '}
							type={'password'}
							name='password'
							value={formData.password}
							onChange={handleChange}
						/>

						<InputField
							label={'CONFIRM PASSWORD: '}
							type={'password'}
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
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

					<div className='login-account-container gap-2 w-fit m-auto mt-3'>
						<p className='text-sm font-semibold tracking-widest'>
							Already have an account?{' '}
							<a
								href='/login'
								className='hover:text-[var(--accent-border)] transition-all duration-200 ease-out'
							>
								Login
							</a>
						</p>
					</div>
				</div>
			</div>

			<div className='footer-sign-up-container'>
				<FooterComponent />
			</div>
		</div>
	);
}

export default SignUpPage;
