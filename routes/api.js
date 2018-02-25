const express = require('express');
const apiRouter = express.Router();
const Dive = require('../models/dive');

// get request for dives page 
apiRouter.get('/dives', (req, res, next) => {
	res.render('dives/dive')
});

// add a new dive into the db
apiRouter.post('/dives', (req, res, next) => {
	Dive.create(req.body).then(function(dive) {
		res.send(dive);
	}).catch(next);
});

// update dive in the db
apiRouter.put('/dives/:id', (req, res, next) => {
	res.send({type: 'PUT'});
});

// delete a dive from the db
apiRouter.delete('/dives/:id', (req, res, next) => {
	Dive.findByIdAndRemove({_id: req.params.id}).then(function(dive) {
		res.send(dive);
	});
});

module.exports = apiRouter;