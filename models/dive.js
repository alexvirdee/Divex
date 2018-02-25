const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create dive Schema & model
const DiveSchema = new Schema({
	number: Number,
	date: { type: Date, default: Date.now },
	location: String,
	objective: String,
	visibility: Number,
	totalTime: Number,
	depth: Number,
	observations: String,
	imageURL: String
});

const Dive = mongoose.model("Dive", DiveSchema);

module.exports = Dive;