var express = require('express');
var router = express.Router();
var helper = require('../lib/helper');
router.get('/', function(req, res) {
    helper.processIncomingText(req.query.From, req.query.Body);
    res.send('');
});
module.exports = router;