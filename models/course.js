const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    dept: {
        type: String
    },
    courseNumber:{
        type: Number
    },
});

module.exports = {
    Course: mongoose.model("Course", courseSchema),
};
