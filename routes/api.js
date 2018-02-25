const express = require('express');
const apiRouter = express.Router();

// get a list of dives from teh database
apiRouter.get('/dives', (req, res, next) => {
	res.send({type: 'GET'});
});

// add a new dive into the db
apiRouter.post('/dives', (req, res, next) => {
	res.send({type: 'POST'});
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