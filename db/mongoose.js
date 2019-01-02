const mongoose = require('mongoose');

// Connect to our remote database hosted on aws ec2 central Canada
mongoose.connect('mongodb://test:csc309@ec2-35-183-8-133.ca-central-1.compute.amazonaws.com:27017/test_db', { useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

module.exports = { mongoose };