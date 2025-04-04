const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const usersRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();
const app = express();
const server = http.createServer(app);

app.use(
	cors({
		origin: 'https://to-do-list-project-pc4p.onrender.com',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	}),
);

app.use(express.json());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.MongoURI,
			collectionName: 'sessions',
		}),
		cookie: {
			secure: true,
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: 'none',
		},
	}),
);

app.use('/', usersRoutes);
app.use('/', taskRoutes);

mongoose
	.connect(process.env.MongoURI)
	.then(() => console.log('Database Connected'))
	.catch((err) => console.log('Failed to Connect!', err));

// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });

server.listen(3000, () => {
	console.log('Server is running on port 3000');
});
