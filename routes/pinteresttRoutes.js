var express = require('express');
var passport = require('passport');
var Strategy = require('passport-pinterest').Strategy;
var pinterestController = require('../controllers/pinterestController');
require('dotenv').config();
var router = express.Router();
//TWITTER
//PASSPORT CONFIGURATIONS

passport.use(new Strategy({
    consumerKey: process.env.PINTERESTCONSUMERKEY,
    consumerSecret: process.env.PINTERESTCONSUMERSECRET,
    callbackURL: process.env.PINTERESTCALLBACKURL
    },
    function(token, tokenSecret, profile, cb) {
        pinterestController.setAuths(profile.id, profile.username, token, tokenSecret);
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
router.get('/connect/:id', pinterestController.getAuths);

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