var TwitterAuth = require('../models/twitterModel');
var Twitter = require('twitter');
require('dotenv').config();

var consumerKey = process.env.TWITTERCONSUMERKEY;
var consumerSecret = process.env.TWITTERCONSUMERSECRET;

exports.setAuths = async(id, username, token, tokenSecret) => {
    try {
        const Auth = await TwitterAuth.insert(id, username, token, tokenSecret);
        return "success";
    } catch(err) {
        console.log('ERROR: ', err.stack);
        return err;
    }
};

exports.getAuths = async(req, res) => {
    if(!req.session.twitterConnected) {
        try {
            var userID= req.params.id;
            const Auth = await TwitterAuth.fetch(userID);
            req.session.twitterUserID = userID;
            req.session.twitterConnected = true;
            req.session.twitterConfig = {
                consumer_key: consumerKey,
                consumer_secret: consumerSecret,
                access_token_key: Auth[0][0].token,
                access_token_secret: Auth[0][0].tokenSecret    
            };
            res.send('Twitter Success');
        } catch(err) {
            req.session.twitterConnected = false;
            console.log('ERROR: ', err.stack);
            res.send(err);
        }
    } else {
        if (req.session.twitterConnected !== null) {
            res.send('Twitter already connected');
        } else {
            res.send('Twitter failed to connected');
        }
    }
};

exports.tweet = async(req, res) => {
    var tweet = "Whatever you tweet";
    console.log("tweet: " + tweet);
    var T = new Twitter(req.session.twitterConfig);
    T.post('statuses/update', { status: tweet }, function(err, data, response) {
        if (!err) {
            console.log(data);
            res.send(response);
        } else {
            console.log('ERROR: ', err.stack);
            res.send(response);
        }
    })  
};

exports.retweet = async(req, res) => {
    var T = new Twitter(req.session.twitterConfig);
    T.post('statuses/retweet/' + req.params.tweetid, function(err, data, response) {
        if (!err) {
            console.log(data);
            res.send(response);
        } else {
            console.log('ERROR: ', err.stack);
            res.send(response);
        }
    });
};

exports.stream = async(req, res) => {
    console.log("stream...");
    req.session.closeTwitterStream = false;
    var T = new Twitter(req.session.twitterConfig);
    T.stream('statuses/filter', {track: 'twitter'},  function(stream, done) {
        stream.on('data', function(tweet) {
            res.write(tweet);
        });
        stream.on('error', function(error) {
            console.log(error);
        });
    });
};

exports.verifyCredentials = async(req, res) => {
    var T = new Twitter(req.session.twitterConfig);
    T.get('account/verify_credentials', { skip_status: true }, function(err, data, response) {
        if (!err) {
            console.log(data);
            res.send(response);
        } else {
            console.log('ERROR: ', err.stack);
            res.send(response);
        }
    });
};

exports.searchTweets = async(req, res) => {
    var tweet = "Whatever you tweet";
    console.log("tweet: " + tweet);
    var T = new Twitter(req.session.twitterConfig);
    T.get('search/tweets', {q: req.params.q}, function(err, data, response) {
        if (!err) {
            console.log(data);
            res.send(response);
        } else {
            console.log('ERROR: ', err.stack);
            res.send(response);
        }
    });  
};

exports.userTimeline = async(req, res) => {
    var tweet = "Whatever you tweet";
    console.log("tweet: " + tweet);
    var T = new Twitter(req.session.twitterConfig);
    T.get('users/' + req.session.twitterUserID + '/tweets', function(err, data, response) {
        if (!err) {
            console.log(data);
            res.send(response);
        } else {
            console.log('ERROR: ', err.stack);
            res.send(response);
        }
    });  
};