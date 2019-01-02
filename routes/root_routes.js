const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const { User, Verification } = require('../models/user');
const { Course } = require('../models/course');
const randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

// configure AWS SDK
aws.config.loadFromPath('config.json');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    })
});

var initImg = 'https://image.flaticon.com/icons/png/512/552/552848.png'

// Index page
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Past Exam Finder',
        css: ['index.css'],
        js: ['index.js'],
    });
});

router.get('/login', isLoggedIn, function (req, res) {
    res.render('login', {
        title: 'Login',
        css: ['registerAndLogin.css'],
        js: ['login.js', 'navbarNeedLogin.js'],
    });
});

router.get('/register', isLoggedIn, function (req, res) {
    res.render('register', {
        title: 'Register',
        css: ['registerAndLogin.css'],
        js: ['login.js', 'navbarNeedLogin.js', 'register.js'],
    });
});

router.get("/logout", function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out.');
    res.redirect("/login");
});

router.post('/login', passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect:"/login",
        failureFlash: true,
    }),
    function(req, res){
        res.redirect('/');
    }
);

// Send verification code
router.post('/verify', function(req, res) {
    const code = randomstring.generate({
        length: 6,
        charset: '0123456789'
    });

    // send some mail
    transporter.sendMail({
        from: 'no-reply@pefinder.tk',
        to: req.body.email,
        subject: 'Past Exam Finder Verification Code',
        text: `Verification Code: ${code}`,
        ses: {
        }
    }, (err, info) => {
        console.log(info.envelope);
        console.log(info.messageId);
    });

    const ver = new Verification({
        email: req.body.email,
        verificationCode: code
    });

    ver.save().then((result) => {
        res.status(200).send();
    }, (error) => {
        res.status(400).send() // 400 for bad request
    })
});

router.post('/register', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    // Validate fields
    req.checkBody('username', 'Email is required').notEmpty();
    req.checkBody("username", "Not a valid email address.").isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('code', 'Verification code is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            title: 'Register',
            css: ['registerAndLogin.css'],
            js: ['login.js', 'navbarNeedLogin.js', 'register.js'],
            errors: errors,
        });
    }
    else {
        const username = req.body.username;
        const input_code = req.body.code;
        Verification.find({
            email: username
        }).then((records) => {
            for (let i = 0; i < records.length; i++) {
                if (records[i].verificationCode === input_code) {
                    return records[i].verificationCode;
                }
            }
            return Promise.reject();
        }).then((true_code) => {
            User.register(new User({username:req.body.username, status: "user", faculty: "Unknown",
                year: "Unknown", img_path:initImg} ), req.body.password, function (err, user) {
                if (err) {
                    res.render('register', {
                        title: 'Register',
                        css: ['registerAndLogin.css'],
                        js: ['login.js', 'navbarNeedLogin.js', 'register.js'],
                        errors: err,
                    });
                } else {
                    passport.authenticate("local")(req, res, function () {
                        req.flash('success_msg', 'You are successfully registered.');
                        res.redirect("/login");
                    });
                }
            });
        }).catch((err) => {
            res.render('register', {
                title: 'Register',
                css: ['registerAndLogin.css'],
                js: ['login.js', 'navbarNeedLogin.js', 'register.js'],
                errors: [ { param: 'code',
                    msg: 'Wrong Verification Code',
                    value: '1' } ]
            });
        });

    }
});

function isLoggedIn (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

// JSON API
// {
//     "dept": "CSC",
//     "courseNumber": 309
// }
router.post("/course", function (req, res) {
    Course.find({
        dept: req.body.dept,
        courseNumber: req.body.courseNumber
    }).then((course) => {
        if (course.length == 0) {
            res.status(404).send()
        } else {
            res.status(200).send()
        }
    }, (error) => {
        res.status(400).send()
    })
});

module.exports = router;