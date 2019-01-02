const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    username: {
        type: String
    },
    context:{
        type: String
    }
    // time: {
    //     type: Number
    // }
});

const SolutionSchema = new Schema({
    dept: {
        type: String
    },
    courseNumber:{
        type: Number
    },
    year: {
        type: Number
    },
    term :{
    	type: String
    },
    type :{
    	type: String
    },
    professor :{
    	type: String
    },
    author :{
    	type: String
    },
    // }
    file: 
      { data: Buffer, name: String, contentType: String },

    comments: [CommentsSchema]
});


module.exports = mongoose.model("Solution", SolutionSchema);