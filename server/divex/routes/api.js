const express = require('express');
const router = require('router');

// get a list of dives from teh database
router.get('/dives', (req, res, next) => {
	res.send({type: 'GET'});
});

// add a new dive into the db
router.post('/dives', (req, res, next) => {
	res.send({type: 'POST'});
});

// update dive in the db
router.put('/dives/:id', (req, res, next) => {
	res.send({type: 'PUT'});
});

// delete a dive from the db
router.delete('/dives/:id', (req, res, next) => {
	res.send({type: 'DELETE'});
});

module.exports = router;