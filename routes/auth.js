const express = require('express');
const passportRouter = express.Router();
const User = require('../models/user');
// encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const ensureLogin = require('connect-ensure-login');
const passport = require('passport');

// GET request to signup form
passportRouter.get('/signup', (req, res, next) => {

});

// Signup a new user
passportRouter.post('/signup', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	if (username === "" || password === "") {
		// do something
	}

	User.findOne({ username }, "username", (err, user) => {
		if (user !== null) {
			// do something
			return;
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashPass = bcrypt.hashSync(password, salt);

		const newUser = new User({
			username,
			password: hashPass
		});

		newUser.save((err) => {
			if (err) {
				// do something
			} else {
				res.redirect("/");
			}
		});
	});
});


passportRouter.get('/login', (req, res, next) => {
	// do something
});

passportRouter.post('/login', passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
	failureFlash: true,
	passReqToCallback: true
}));

passportRouter.get("/logout", (req, res, next) => {
	res.logout();
	res.redirect("/login");
});

module.exports = passportRouter;