var RedditAuth = require('../models/redditModel');
var Reddit = require('reddit');
require('dotenv').config();

var consumerKey = process.env.REDDITCONSUMERKEY;
var consumerSecret = process.env.REDDITCONSUMERSECRET;

exports.setAuths = async(id, username, token, tokenSecret) => {
    try {
        const Auth = await RedditAuth.insert(id, username, token, tokenSecret);
        return "success";
    } catch(err) {
        console.log('ERROR: ', err.stack);
        return err;
    }
};

exports.getAuths = async(req, res) => {
    if(!req.session.redditConnected) {
        try {
            var userID= req.params.id;
            const Auth = await RedditAuth.fetch(userID);
            req.session.redditUserID = userID;
            req.session.redditConnected = true;
            req.session.redditConfig = {
                consumer_key: consumerKey,
                consumer_secret: consumerSecret,
                access_token_key: Auth[0][0].token,
                access_token_secret: Auth[0][0].tokenSecret    
            };
            res.send('Reddit Success');
        } catch(err) {
            req.session.twitterConnected = false;
            console.log('ERROR: ', err.stack);
            res.send(err);
        }
    } else {
        if (req.session.twitterConnected !== null) {
            res.send('Reddit already connected');
        } else {
            res.send('Reddit failed to connected');
        }
    }
};