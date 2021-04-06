// app/models/user.js
// load the things we need
var mysql = require('mysql');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema;

// create the model for users and expose it to our app
module.exports = mysql.model('User', userSchema);