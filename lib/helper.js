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
    answers.push('TERRIBLIST idear I\'ve ever heard!');
    answers.push('The cake is a lie!');
    answers.push('But of Course!');
    answers.push('Not in a million years');
    answers.push('Not unless you go to college');
    answers.push('Only if you get a manicure');
    answers.push('Only in Vegas');
    answers.push('Only if you get caught');
    answers.push('That would be bad for your health');
    answers.push('Not if you buy Netflix');
    answers.push('You mother wouldn’t approve');
    answers.push('Your parents didn’t raise you that way');
    answers.push('Only if there is free food');
    answers.push('The silhouette on the building says yes');
    answers.push('Go for it!');
    answers.push('Why are you asking?');
    answers.push('Do you really need to know?');
    answers.push('You\'re not going like the answer');
    answers.push('What ever floats your boat');
    answers.push('If that\'s what makes you sleep at night');
    answers.push('Ain’t nobody got time for that');
    answers.push('Is that even legal?');
    answers.push('You don’t need a man for that');
    answers.push('What\’s in it for me?');
    answers.push('You\’ve had enough for today');
    answers.push('No, get a job');
    answers.push('Yes, because of the internet');
    answers.push('#WWJD');
    answers.push('You\’ll know….');
    answers.push('Well, is it free?');
    answers.push('It\’s okay if you fail');
    answers.push('It\’s dangerous to do that alone');
    answers.push('Go ahead, live on the edge');
    answers.push('I would advise against it');
    answers.push('That would require therapy');
    answers.push('This question bores me');
    answers.push('You didn\’t pay me enough to answer this');
    answers.push('Do it for the vine');
    answers.push('Only if there are cute boys');
    answers.push('what are you waiting for');
    answers.push('Yes, with my blessing');
    answers.push('Are you even prepared for that?');
    answers.push('Can you handle that?');
    answers.push('No, that\’s stupid');
    answers.push('You should consult your doctor');
    answers.push('Sorry busy, try again later…or not');
    answers.push('After your chores');
    answers.push('Do you ever stop talking?');
    answers.push('Stop nagging me');
    answers.push('I can\’t even….');
    answers.push('First take a selfie');
    
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