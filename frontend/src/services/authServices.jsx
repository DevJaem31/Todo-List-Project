import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const Login = async (email, password) => {
	try {
		const response = await axios.post(
			`${API_URL}/login`,
			{ email, password },
			{ withCredentials: true },
		);
		return response.data;
	} catch (error) {
		console.error('Login error:', error);
		throw error.response?.data || { message: 'An unexpected error occurred during login' };
	}
};

export const Register = async (userData) => {
	try {
		const response = await axios.post(`${API_URL}/signup`, userData, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Register error:', error);
		throw error.response?.data || 'Registration failed';
	}
};

export const Logout = async () => {
	try {
		const response = await axios.get(`${API_URL}/logout`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		// Check if the error has a response and handle accordingly
		if (error.response) {
			console.error('Logout error:', error.response.data);
			throw error.response?.data || 'Logout failed';
		} else {
			// Handle network or connection errors
			console.error('Network error or no response:', error.message);
			throw error.message || 'Network error';
		}
	}
};

export const fetchUser = async () => {
	try {
		const isAuthenticated = await checkSession();
		if (!isAuthenticated) return null;

		const response = await axios.get(`${API_URL}/fetch-user`, { withCredentials: true });
		return response.data.user;
	} catch (error) {
		console.error('Fetch user error:', error);
		throw error.response?.data || 'Failed to fetch user data';
	}
};

export const checkSession = async () => {
	try {
		await axios.get(`${API_URL}/check-session`, { withCredentials: true });
		return true;
	} catch (error) {
		console.error('Session error:', error);
		return false;
	}
};
