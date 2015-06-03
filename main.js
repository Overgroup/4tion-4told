/// <reference path="typings/node/node.d.ts"/>
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require("fs");
global.twilioPhoneNumber = '12314121000';

if (process.env.TWILIO_AUTH_TOKEN) {
    global.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    global.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
} else {
    global.twilioAccountSid = fs.readFileSync('./private/twilio-account-sid.txt','utf8');
    global.twilioAuthToken = fs.readFileSync('./private/twilio-auth-token.txt','utf8');
}

if (process.env.TWITTER_CONSUMER_KEY) {
    global.twitterAccessToken = process.env.TWITTER_ACCESS_TOKEN;
    global.twitterAccessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
    global.twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY;
    global.twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET;
} else {
    global.twitterAccessToken = fs.readFileSync('./private/twitter-access-token.txt','utf8');
    global.twitterAccessTokenSecret = fs.readFileSync('./private/twitter-access-token-secret.txt','utf8');
    global.twitterConsumerKey = fs.readFileSync('./private/twitter-consumer-key.txt','utf8');
    global.twitterConsumerSecret = fs.readFileSync('./private/twitter-consumer-secret.txt','utf8');
}

var routes = require('./routes/index');
var twilio_receive = require('./routes/twilio-receive');
var twilio_send = require('./routes/twilio-send');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/twilio-send', twilio_send);
app.use('/twilio-receive', twilio_receive);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
