var getTwitterClient = exports.getTwitterClient = function() {
  	var twitterAPI = require('node-twitter-api');
    var twitter = new twitterAPI({
        consumerKey: global.twitterConsumerKey,
        consumerSecret: global.twitterConsumerSecret,
        callback: global.twitterAuthUrl
    });
	return twitter;
};
var updateTwitterStatus = exports.updateTwitterStatus = function(message) {
    var twitter = getTwitterClient();
	twitter.statuses("update", {status: message}, global.twitterAccessToken, global.twitterAccessTokenSecret, function(error, data, response) {
	        if (error) {
                console.log(error);
            }
	    }
	);  
};
var getRandomAnswer = exports.getRandomAnswer = function (callback) {
    var answers = [];
    answers.push('If you want to!');
    answers.push('I don\'t know, ask again later');
    answers.push('TERRIBLIST idear I\'ve ever heard!');
    answers.push('OOH You make me want to shout!');
    callback(answers[Math.floor(Math.random() * answers.length)]);
};
exports.processIncomingText = function (phoneNumber, message) {
    var lastFourDigits = phoneNumber.slice(-4);
    getRandomAnswer(function(answer) {
        var messageForTwitter1 = 'xxx-xxx-' + lastFourDigits + ' Q: ' + message;
        var messageForTwitter2 = 'xxx-xxx-' + lastFourDigits + ' A: ' + answer;
        updateTwitterStatus(messageForTwitter1);
        updateTwitterStatus(messageForTwitter2);
        sendTextMessage(phoneNumber, answer);
    });    
};
var sendTextMessage = exports.sendTextMessage = function (toNumber, message) {
    var client = require('twilio')(global.twilioAccountSid, global.twilioAuthToken);
    client.sendMessage({
        to: toNumber, // Any number Twilio can deliver to
        from: global.twilioPhoneNumber, // A number you bought from Twilio and can use for outbound communication
        body: message // body of the SMS message
    }, 
        function(err, responseData) { //this function is executed when a response is received from Twilio
            if (err) {
                console.log(err)
            } else {
                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
            }
        });
};