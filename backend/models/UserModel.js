const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 3,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
	},
	password: {
		type: String,
		required: true,
	},
});

const UserModel = mongoose.model('User', userSchema, 'TasklyUsers');

module.exports = UserModel;
