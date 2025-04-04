const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

const signupUser = async (req, res) => {
	try {
		const { username, email, password, confirmPassword } = req.body;

		if (!username || !email || !password || !confirmPassword) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: 'Invalid email format' });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: 'Passwords do not match' });
		}

		if (password.length < 8) {
			return res.status(400).json({ message: 'Password must be at least 6 characters long' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({ message: 'User created successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error during signup' });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		req.session.user = { userId: user._id, username: user.username, email: user.email };
		console.log('Session object:', req.session);

		res.status(200).json({ message: 'Login successful', user: req.session.user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error during login' });
	}
};

const logoutUser = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).json({ message: 'Logout failed' });
		}
		res.clearCookie('connect.sid');
		res.status(200).json({ message: 'Logout successful' });
	});
};

const fetchUser = (req, res) => {
	if (req.session.user) {
		res.status(200).json({ authenticated: true, user: req.session.user });
		console.log('Session object:', req.session);
	} else {
		res.status(401).json({ authenticated: false });
	}
};

const checkSession = (req, res) => {
	if (req.session.user) {
		res.status(200).json({ message: 'User is authenticated' });
	} else {
		res.status(401).json({ message: 'Not authenticated' });
	}
};

module.exports = { signupUser, loginUser, checkSession, logoutUser, fetchUser };
