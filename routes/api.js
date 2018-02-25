const express = require('express');
const apiRouter = express.Router();

// get request for dives page 
apiRouter.get('/dives', (req, res, next) => {
	res.render('dives/dive')
});

// add a new dive into the db
apiRouter.post('/dives', (req, res, next) => {
	console.log(req.body);
	res.send({
		type: 'POST',
		name: req.body.number,
		date: req.body.date,
		location: req.body.location,
		objective: req.body.objective,
		visibility: req.body.visibility,
		totalTime: req.body.totalTime,
		depth: req.body.depth,
		observations: req.body.observations
	});
});

// update dive in the db
apiRouter.put('/dives/:id', (req, res, next) => {
	res.send({type: 'PUT'});
});

// delete a dive from the db
apiRouter.delete('/dives/:id', (req, res, next) => {
	res.send({type: 'DELETE'});
});

module.exports = apiRouter;