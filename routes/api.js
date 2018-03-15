const express = require('express');
const apiRouter = express.Router();
const Dive = require('../models/dive');
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
require('es6-promise').polyfill();
require('isomorphic-fetch');

// const Unsplash = require('unsplash-js').default;
import Unsplash, {toJson} from 'unsplash-js';


const unsplash = new Unsplash({
  applicationId: "1eef1b92ef476559fc534c3f9410ca265db6ed24b82f882cb00403f530b360c8",
  secret: "2e077ae2856703ff10c93f4ddd021cc81d389c34a624efb632eddd573cda505a",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
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


// Photography of Dives from Unsplash ** All users can see this page
apiRouter.get('/photography', (req, res, next) => {
    unsplash.photos.getRandomPhoto({ query: "scuba" })
  .then(toJson)
  .then(json => {
    const jsonResult = json;
    console.log(json);
    res.render('dives/photography', 
        {photos: jsonResult});
  });
});


apiRouter.get('/dives/new', ensureLoggedIn('/login'), (req, res, next) => {
    res.render('dives/new')
});

// add a new dive into the db
apiRouter.post('/dives/new', ensureLoggedIn('/login'), (req, res, next) => {
    const newDive = new Dive({
        number: req.body.number,
        date: req.body.date,
        location: req.body.location,
        lat: req.body.lat,
        lng: req.body.lng,
        objective: req.body.objective,
        visibility: req.body.visibility,
        totalTime: req.body.totalTime,
        depth: req.body.depth,
        observations: req.body.observations,
        owner: req.user._id
    });
    console.log("=========", newDive);
    newDive.save((err) => {
        if (err) {
            console.log(err.message);
            res.render('dives/new');
        } else {
            res.redirect('/api/dives');
        }
    });
});

// find specific dive render detail of dive in a new view
apiRouter.get('/dives/:id', ensureLoggedIn('/login'), (req, res, next) => {
    const diveId = req.params.id;
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
    const diveId = req.params.id;
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
	const diveId = req.params.id;
	const updates = {
		number: req.body.number,
        date: req.body.date,
        location: req.body.location,
        lat: req.body.lat,
        lng: req.body.lng,
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


// view location
apiRouter.get('/dives/:id/location', ensureLoggedIn('/login'), (req, res, next) => {
   const diveId = req.params.id;
     Dive.findById(diveId, (err, dive) => {
        if (err) { return next(err) }
        if (!dive) { return next(new Error("404")) }
        return res.render('dives/location', {
            dive: dive,
            lat: req.body.lat,
            lng: req.body.lng,
            observations: req.body.observations
        });
    });
});

// delete a dive from the db
apiRouter.delete('/dives/:id', ensureLoggedIn('/login'), (req, res, next) => {
	const diveId = req.params.id;
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