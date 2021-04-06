//Dependencies
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var cron = require("node-cron");
var scheduledEventController = require('./controllers/scheduledEventController');
require('dotenv').config();

//INTENDED DASHBOARD FRONTEND
//https://wrappixel.com/demos/free-admin-templates/xtreme-angular-lite/angular/component/tabs

//Routes
//Page Routes
var indexRoutes = require('./routes/indexRoutes');
//User Routes
var userRoutes = require('./routes/userRoutes');
//API Routes
var facebookRoutes = require('./routes/facebookRoutes');
var twitterRoutes = require('./routes/twitterRoutes');
//var youtubeRoutes = require('./routes/youtube');

var app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);
app.use(cookieParser());

//Session middleware
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'XCR3rsasa%RDHHH', 
    cookie: {   secure: 'auto', 
                maxAge: 60 * 60 * 1000 
            }
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', indexRoutes);
//app.use('/user', userRoutes);

//Linked API Routes
app.use('/facebook', facebookRoutes);
app.use('/twitter', twitterRoutes);
//app.use('/youtube', youtubeRoutes);

// Scehduled Facebook Events
// Scehduled Instagram Eventa
// Scehduled Pintrest Events
// Scehduled Reddit Events

// Scehduled Twitter Events
cron.schedule("*/10 * * * * *", function() {
    scheduledEventController.getTwitter;
    console.log( new Date().toUTCString() + ": Server is working\n");
});

// Scehduled Youtube Events

//Start Server
app.listen(process.env.PORT || 5000, function () {
    console.log('API Playground App listening on port: ' + process.env.PORT);
});