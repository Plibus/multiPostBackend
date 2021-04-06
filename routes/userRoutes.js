var express = require('express');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var twitterController = require('../controllers/twitterController');
var bcrypt = require('bcrypt');
var router = express.Router();

passport.use(new localStrategy(function(username, password, done) {
    User.find({username : username}, function(err,user) {			
        if(err) throw err;
        if(user.length == 0) {
            console.log('Unknown User');
            return done(null,false,{message: 'Unknown User'});
        } 
        comparePassword(password,user[0].password, function(err,isMatch) {
            if(err) throw err;
            if(isMatch) {
                return done(null, user);
                res.redirect('/');
            } else {
                console.log('Invalid Password');
                return done(null, false, {message: 'Invalid Password'});
            }
        })
    });
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

router.post('/register',function(req, res, next) {});

router.get('/login',passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:'Invalid Username or Password'}), function(req,res) {});

router.get('/logout', function(req, res) {});

router.get('/account', function(req, res) {});

router.get('/user/:id/account', function(req, res) {});

router.get('/user', function(req, res) {});

router.get('/user/:id', function(req, res) {});

router.get('/user/history', function(req, res) {});

router.get('/user/:id/history', function(req, res) {});