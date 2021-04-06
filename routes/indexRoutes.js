module.exports = router;

var express = require('express');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var router = express.Router();

app.use(express.static(path.join(require.main.filename + '/public','assets')));
app.use(express.static(path.join(require.main.filename + '/public','css')));
app.use(express.static(path.join(require.main.filename + '/public','javascript')));
/* GET home page. */

router.get('/', (req, res, next) => {
    res.sendFile(path.join(appDir + '/views/home/index.html'));
});

router.get('/login', (req, res, next) => {
    res.sendFile(path.join(appDir + '/views/login/index.html'));
});

router.get('/register', (req, res, next) => {
    res.sendFile(path.join(appDir + '/views/register/index.html'));
});

router.get('/logout', (req, res, next) => {
    res.sendFile(path.join(appDir + '/views/logout/index.html'));
});

router.get('/dashboard', (req, res, next) => {
    res.sendFile(path.join(appDir + '/views/dashboard/index.html'));
});

router.get('/profile', (req, res, next) => {
    res.sendFile(path.join(appDir + '/views/profile/index.html'));
});

router.get('/admin', (req, res, next) => {
    res.sendFile(path.join(appDir + '/views/profile/index.html'));
});

module.exports = router;