var express = require('express');
var router = express.Router();
var helper = require('../lib/helper');
var path = require('path');

router.get('/', function(req, res, next) {
    if(!global.twitterAccessToken) {
        res.send('<a href="twitter-setup">Click here</a> to authorize with Twitter.');
    } else {
        res.sendFile('index.html', { root: path.join(__dirname, '../public') });
    }
});

module.exports = router;