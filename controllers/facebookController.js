var FacebookAuth = require('../models/facebookModel');
var Facebook = require('fb');
require('dotenv').config();

var consumerKey = process.env.FACEBOOKCLIENTID;
var consumerSecret = process.env.FACEBOOKCLIENTSECRET;

exports.setAuths = async(username, token, tokenSecret) => {
    try {
        const Auth = await FacebookAuth.insert(username, token, tokenSecret);
        return "success";
    } catch(err) {
        console.log('ERROR: ', err.stack);
        return err;
    }
};

exports.getAuths = async(req, res) => {
    try {
        console.log("Search Username: " + req.params.username);
        const Auth = await FacebookAuth.fetch(req.params.username);
        console.log(req.session);
        req.session.facebookConfig = {
            clientID: consumerKey,
            clientSecret: consumerSecret,
            access_token_key: Auth[0][0].token,
            access_token_secret: Auth[0][0].tokenSecret    
        };
        res.send('Facebook Success');
    } catch(err) {
        console.log('ERROR: ', err.stack);
        res.send(err);
    }
};