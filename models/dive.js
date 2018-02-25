const mongoose = require('mongoose');
const Schema = mongoose.Schema;

"geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  }

// create geolocation Schema
const GeoSchema = new Schema({
	type: {
		type: String,
		default: "Point"
	},
	coordinates: {
		type: [Number],
		index: "2dsphere"
	}
});

// create dive Schema & model
const DiveSchema = new Schema({
	number: {
		type: Number,
		required: [true, 'Dive number is required']
	},
	date: { 
		type: Date, 
		default: Date.now 
	},
	location: String,
	objective: String,
	visibility: Number,
	totalTime: Number,
	depth: Number,
	observations: [String]

	// add in images to Schema

	// add in maps location 
});

const Dive = mongoose.model("Dive", DiveSchema);

module.exports = Dive;