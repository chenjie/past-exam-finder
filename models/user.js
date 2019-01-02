const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    /********************************/
    faculty: String,
    year:  String,
    img: { data: Buffer, contentType: String },
    img_path: String,
    status:{
        //not used 
    	type:String
    }
});

const verificationSchema = new Schema({
    email: {
        type: String
    },
    verificationCode:{
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = {
    User: mongoose.model("User", UserSchema),
    Verification: mongoose.model("Verification", verificationSchema),
};
