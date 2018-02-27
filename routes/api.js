const express = require('express');
const apiRouter = express.Router();
const Dive = require('../models/dive');
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


// get request for dives page 
apiRouter.get('/dives', ensureLoggedIn('/login'), (req, res, next) => {
	Dive.find({owner: req.user._id},
		(err, allDives) => {
			if(err){
				res.redirect("/login");
			}
			res.render('dives/dive', {
				user: req.user,
				dives: allDives
		});
		})
		// .then(function(dives) {
		// 	res.send(dives);
		// });
		// if (req.user === undefined) {
  //     		res.redirect("/login");
  //     		return;
  // 			}

		// res.render('dives/dive', {
		// 	user: req.user
		// });
	// console.log(req.user);
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
    objective: req.body.objective,
    visibility: req.body.visibility,
    totalTime: req.body.totalTime,
    depth: req.body.depth,
    observations: req.body.observations,
    owner: req.user._id
  });
	console.log("=========", newDive.owner);

  newDive.save( (err) => {
	if (err) {
		res.render('dives/new');
	} else {
		res.redirect('/api/dives');
	}
  });
});


apiRouter.get('/dives/:id', (req, res, next) =>{
	diveId = req.params.id;
	Dive.findById(diveId, (err, theDive) => {
		if(err){
			next(err);
			return;
		}
		res.render('dives/details', {
			dive: theDive
		})
	})
})

// update dive in the db
apiRouter.put('/dives/:id', (req, res, next) => {
	diveId = req.params.id;
	Dive.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Dive.findOne({_id: req.params.id}).then(function(dive) {
			res.render('dives/edit', {

			});
		});
	});
});

// delete a dive from the db
apiRouter.delete('/dives/:id', (req, res, next) => {
	Dive.findByIdAndRemove({_id: req.params.id}).then(function(dive) {
		res.send(dive);
	});
});

module.exports = apiRouter;