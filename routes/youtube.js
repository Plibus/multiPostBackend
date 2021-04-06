var express = require('express');
var passport = require('passport');
var Strategy = require('passport-youtube').Strategy;
var youtubeController = require('../controllers/youtubeController');
require('dotenv').config();
var router = express.Router();
//TWITTER
//PASSPORT CONFIGURATIONS

passport.use(new Strategy({
    consumerKey: process.env.YOUTUBECONSUMERKEY,
    consumerSecret: process.env.YOUTUBECONSUMERSECRET,
    callbackURL: process.env.YOUTUBECALLBACKURL
    },
    function(token, tokenSecret, profile, cb) {
        youtubeController.setAuths(profile.id, profile.username, token, tokenSecret);
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
router.get('/connect/:id', youtubeController.getAuths);

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

module.exports = router;