const express = require('express');
const auth = express.Router();
const passport = require('passport');

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

auth.get('/login', ensureLoggedOut(), (req, res, next) => {
    res.render('auth/login');
});

auth.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect: '/api/dives',
    failureRedirect: '/login'
}))

// auth routes for facebook login
auth.get('/auth/facebook', passport.authenticate('facebook'));
auth.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/api/dives',
	failureRedirect: '/'
}));

// auth routes for google login
auth.get('/auth/google', passport.authenticate("google", {
	scope: ["https://www.googleapis.com/auth/plus.login",
	"https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

auth.get("/auth/google/callback", passport.authenticate("google", {
	successRedirect: '/api/dives',
	failureRedirect: '/'
}))

// GET request to signup form
auth.get('/signup', ensureLoggedOut(), (req, res, next) => {
    res.render('auth/signup');
});

auth.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
    successRedirect: '/api/dives',
    failureRedirect: '/signup'
}));

// Handle logout
auth.post("/logout", ensureLoggedIn('/login'), (req, res, next) => {
    req.logout();
    res.redirect('/');
})


module.exports = auth;