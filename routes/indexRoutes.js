module.exports = router;

var express = require('express');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var router = express.Router();

//app.use(express.static(path.join(appDir + '/public','assets')));
//app.use(express.static(path.join(appDir + '/public','css')));
//app.use(express.static(path.join(appDir + '/public','javascript')));
/* GET home page. */

router.get('/', (req, res, next) => {
    console.log("home");
    res.sendFile(path.join(appDir + '/views/home/index.html'));
});

router.post('/login', (req, res, next) => {
    console.log("login");
    res.sendFile(path.join(appDir + '/views/login/index.html'));
});

router.get('/register', (req, res, next) => {
    console.log("register");
    res.sendFile(path.join(appDir + '/views/register/index.html'));
});

router.post('/logout', (req, res, next) => {
    console.log("logout");
    res.sendFile(path.join(appDir + '/views/logout/index.html'));
});

router.post('/dashboard', (req, res, next) => {
    console.log("dashboard");
    res.sendFile(path.join(appDir + '/views/dashboard/index.html'));
});

router.get('/profile', (req, res, next) => {
    res.sendFile(path.join(appDir + '/views/profile/index.html'));
});

router.get('/admin', (req, res, next) => {
    res.sendFile(path.join(appDir + '/views/profile/index.html'));
});

module.exports = router;