var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var twitterController = require('../controllers/twitterController');
require('dotenv').config();
var router = express.Router();
//TWITTER
//PASSPORT CONFIGURATIONS

passport.use(new Strategy({
    consumerKey: process.env.TWITTERCONSUMERKEY,
    consumerSecret: process.env.TWITTERCONSUMERSECRET,
    callbackURL: process.env.TWITTERCALLBACKURL
    },
    function(token, tokenSecret, profile, cb) {
        twitterController.setAuths(profile.id, profile.username, token, tokenSecret);
        return cb(null, profile, token, tokenSecret);
    }
));

passport.serializeUser(function(user, done) {
    console.log('serializeUser');
    console.log(user);
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('deserializeUser');
    done(null, obj);
});

//AUTHORIZATION ROUTES
router.get('/connect/:id', twitterController.getAuths);

router.get('/login', passport.authenticate('twitter'));

router.get('/return',
    passport.authenticate('twitter', { failureRedirect: '/TwitterFailure' }),
    async function(req, res) {
    try {
        res.redirect('/twitter/connect/' + req.session.passport.user.id);
    } catch(e) {
        if(!e.statusCode) {
            console.log(e);
            res.send('TwitterFailure');
        }
    }
});

router.get('/logout', function(req, res){
    req.session.passport.deserializeUser((function (err) {
        res.redirect('/');
    }));
});

//GET ROUTES

// STREAM ROUTES
router.get('/stream', twitterController.stream);

// POST ROUTES
router.get('/tweet', twitterController.tweet);
// Retweets by tweet id
router.get('/retweet/:tweetid', twitterController.retweet);
// Retieve tweets by query
router.get('/search/tweets/:q', twitterController.searchTweets);
// Retrieve timelines
router.get('/timeline', twitterController.userTimeline);
// Retrieve twitter account data
router.get('/account', twitterController.verifyCredentials);

module.exports = router;