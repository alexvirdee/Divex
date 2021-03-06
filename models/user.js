const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema & model
const userSchema = new Schema({
	username: String,
	email: String,
	password: String,
	facebookID: String,
	googleID: String
},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at"}
	});

const User = mongoose.model("User", userSchema);

module.exports = User;