const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create dive Schema & model
const DiveSchema = new Schema({
	number: Number,
	date: { type: Date, default: Date.now },
	location: String,
	objective: String,
	conditions: String,
	timeIn: Date,
	timeOut: Date,
	totalTime: Date,
	depth: Number,
	observations: String 
});

const Dive = mongoose.model("Dive", DiveSchema);

module.exports = Dive;