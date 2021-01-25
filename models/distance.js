//Create distance scheme and model in this file 

const mongoose= require('mongoose');
//constructor function
const Schema = mongoose.Schema;
//make a schema that deinfes the structure
const distanceSchema = new Schema({
	source: {
		type: String, 
		required: true
	},
	destination: {
		type: String,
		required: true
	},
    distance: {
		type: Number,
		required: true
    },
    hits: {
        type: Number,
    }
})

const Distance = mongoose.model('distanceCalc', distanceSchema);
module.exports= Distance;