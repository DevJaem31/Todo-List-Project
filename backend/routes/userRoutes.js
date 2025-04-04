const express = require('express');
const router = express.Router();
const isAuthenticated = require('../helpers/middleware');

const {
	signupUser,
	loginUser,
	logoutUser,
	checkSession,
	fetchUser,
} = require('../controllers/userController');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/fetch-user', fetchUser);
router.get('/check-session', checkSession);

router.get('/', isAuthenticated, (req, res) => {
	console.log('Session in /:', req.session);
	if (req.session.user) {
		res.json({ authenticated: true });
	} else {
		res.json({ authenticated: false });
	}
});

module.exports = router;
