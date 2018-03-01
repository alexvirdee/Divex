const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    owner: {
        type: Schema.Types.ObjectId,
        required: [true, "Must be an owner to add a dive"]
    },
    number: {
        type: Number,
        required: [true, 'Dive number is required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: String,
    lat: Number,
    lng: Number,
    objective: String,
    visibility: Number,
    totalTime: Number,
    depth: Number,
    observations: [String],
    // add in maps location 
    geometry: GeoSchema
    // add in images to Schema
});

const Dive = mongoose.model("Dive", DiveSchema);

module.exports = Dive;
