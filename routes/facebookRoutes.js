var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var facebookController = require('../controllers/facebookController');
require('dotenv').config();
var router = express.Router();
//FACEBOOK

//PASSPORT CONFIGURATIONS
passport.use(new Strategy({
    clientID: process.env.FACEBOOKCLIENTID,
    clientSecret: process.env.FACEBOOKCLIENTSECRET,
    callbackURL: process.env.FACEBOOKCALLBACKURL
  },
  function(token, tokenSecret, profile, cb) {
    facebookController.setAuths(1, profile.username, token, tokenSecret);
    return cb(null, profile, token, tokenSecret);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

//AUTHORIZATION ROUTES
router.get('/login', passport.authenticate('twitter'));

router.get('/return',
  passport.authenticate('facebook', { failureRedirect: '/TwitterFailure' }),
  async function(req, res) {
    try {
        res.redirect('/facebook/connect/' + req.session.passport.user.username);
    } catch(e) {
        if(!e.statusCode) {
            console.log(e);
            res.send('FacebookFailure');
        }
    }
});

router.get('/logout',
  function(req, res){
    req.session.destroy(function (err) {
      res.redirect('/');
    });
 });

module.exports = router;