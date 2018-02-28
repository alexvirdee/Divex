const express = require('express');
const apiRouter = express.Router();
const Dive = require('../models/dive');
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'process.env.AWS_SECRET_ACCESS_KEY ',
    accessKeyId: 'process.env.AWS_ACCESS_KEY_ID',
    region: 'us-east-1'
});

var s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'divex',
        key: function(req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

// get request for dives page 
apiRouter.get('/dives', ensureLoggedIn('/login'), (req, res, next) => {
    Dive.find({ owner: req.user._id },
        (err, allDives) => {
            if (err) {
                res.redirect("/login");
            }
            res.render('dives/dive', {
                user: req.user,
                dives: allDives
            });
        });
});


apiRouter.get('/dives/new', ensureLoggedIn('/login'), (req, res, next) => {
    res.render('dives/new')
});

// add a new dive into the db
apiRouter.post('/dives/new', upload.array('upl', 1), ensureLoggedIn('/login'), (req, res, next) => {
    const newDive = new Dive({
        number: req.body.number,
        date: req.body.date,
        location: req.body.location,
        objective: req.body.objective,
        visibility: req.body.visibility,
        totalTime: req.body.totalTime,
        depth: req.body.depth,
        observations: req.body.observations,
        picture: {
            name: req.body.name,
            path: req.body.path,
            originalName: req.body.originalname
        },
        owner: req.user._id
    });
    res.send("Uploaded!");
    console.log("=========", newDive.owner);
    newDive.save((err) => {
        if (err) {
            res.render('dives/new');
        } else {
            res.redirect('/api/dives');
        }
    });
});

// find specific dive render detail of dive in a new view
apiRouter.get('/dives/:id', ensureLoggedIn('/login'), (req, res, next) => {
    diveId = req.params.id;
    Dive.findById(diveId, (err, theDive) => {
        if (err) {
            next(err);
            return;
        }
        res.render('dives/details', {
            dive: theDive
        });
    });
});


// setup for update/edit route handling
apiRouter.get('/dives/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
    diveId = req.params.id;
    Dive.findById(diveId, (err, dive) => {
        if (err) { return next(err) }
        if (!dive) { return next(new Error("404")) }
        return res.render('dives/edit', {
            dive: dive
        });
    });
});

// update dive in the db
apiRouter.post('/dives/:id', ensureLoggedIn('/login'), (req, res, next) => {
    diveId = req.params.id;
    const updates = {
        number: req.body.number,
        date: req.body.date,
        location: req.body.location,
        objective: req.body.objective,
        visibility: req.body.visibility,
        totalTime: req.body.totalTime,
        depth: req.body.depth,
        observations: req.body.observations,
        owner: req.user._id
    }
    Dive.findByIdAndUpdate(diveId, updates, (err, dive) => {
        if (err) {
            return res.render('dives/edit', {
                dive
            });
        }
        if (!dive) {
            return next(new Error('404'));
        }
        return res.redirect(`/api/dives/${dive._id}`);
    });
});


// view gallery 
apiRouter.get('/dives/:id/gallery', ensureLoggedIn('/login'), (req, res, next) => {
    diveId = req.params.id;
    Dive.findById(diveId, (err, dive) => {
        if (err) { return next(err) }
        if (!dive) { return next(new Error("404")) }
        return res.render('dives/gallery', {
            dive: dive
        });
    });
});

// delete a dive from the db
apiRouter.delete('/dives/:id', ensureLoggedIn('/login'), (req, res, next) => {
    diveId = req.params.id;
    Dive.findByIdAndRemove(diveId, (err, dive) => {
        if (err) {
            return res.render('/dives', {
                dive
            });
        }
        if (!dive) {
            return next(new Error('404'));
        }
        // return res.redirect('/api/dives');
        res.send('success');
    });
});

module.exports = apiRouter;