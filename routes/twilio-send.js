var express = require('express');
var router = express.Router();
var helper = require('../lib/helper');

router.get('/', function(req, res, next) {
    helper.sendTextMessage('18506026917', 'hi how are you');
    res.send('sent message!');
});

module.exports = router;