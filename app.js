var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// require environment variables from .env file
require('dotenv').config();

// express layouts
var expressLayouts = require('express-ejs-layouts');

// Mongoose Configure/Connect
const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/divex");
// Mlab deploy configuration use when pushing to heroku 
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

// Require the models schemas for db
const User = require('./models/user');
const Dive = require('./models/dive');

// Require Passport
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const flash = require('connect-flash');
const session = require("express-session");

// Hashing
const bcrypt = require('bcrypt');


// LINK ROUTES
var index = require('./routes/index');

// initialize routes
var auth = require('./routes/auth');
var apiRouter = require('./routes/api');


var app = express();

// express layouts
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "divex-app",
    resave: true,
    saveUninitialized: false
}));

// passport configuration
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

// Signing Up
passport.use('local-signup', new LocalStrategy({ passReqToCallback: true },
    (req, username, password, next) => {
        // To avoid race conditions
        process.nextTick(() => {
            User.findOne({
                'username': username
            }, (err, user) => {
                if (err) { return next(err); }

                if (user) {
                    return next(null, false);
                } else {
                    // Destructure the body
                    const { username, email, description, password } = req.body;
                    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
                    const newUser = new User({
                        username,
                        email,
                        password: hashPass
                    });

                    newUser.save((err) => {
                        if (err) { next(err); }
                        return next(null, newUser);
                    });
                }
            });
        });
    }));

passport.use('local-login', new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, false, { message: "Incorrect username" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, { message: "Incorrect password" });
        }

        return next(null, user);
    });
}));


passport.use(new FbStrategy({
    clientID: "process.env.FACEBOOK_ID", 
    clientSecret: "process.env.FACEBOOK_SECRET", // add when deployed
    callbackURL: "/auth/facebook/callback",
    profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    profileFields: ['id', 'email', 'name']

}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookID: profile.id }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, user);
        }

        const newUser = new User({
            facebookID: profile.id
        });


        newUser.save((err) => {
            if (err) {
                return done(err);
            }
            done(null, newUser);
        });
    });

}));


passport.use(new GoogleStrategy({
    clientID: "process.env.GOOGLE_ID",
    clientSecret: "process.env.GOOGLE_SECRET",
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, user);
        }

        const newUser = new User({
            googleID: profile.id
        });

        newUser.save((err) => {
            if (err) {
                return done(err);
            }
            done(null, newUser);
        });
    });

}));

app.use(passport.initialize());
app.use(passport.session());



// authentication configuration
app.use((req, res, next) => {
    if (typeof(req.user) !== "undefined") {
        res.locals.userSignedIn = true;
        // res.locals.user = req.user || null
    } else {
        res.locals.userSignedIn = false;
    }
    next();
})


// MIDDLEWARE
app.use('/', index);
app.use('/', auth);
app.use('/api', apiRouter); // dive routes


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');

    // handle error for dive number if not included
    res.status(422).send({ error: err.message });
});

module.exports = app;