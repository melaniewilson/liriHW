// dependancies
var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
// node
var request = require("request");
var fs = require("fs");

// twitter
var getMyTweets = function() {

  var client = new Twitter(keys.twitterKeys);

  var params = {
    screen_name: "cnn"
  };
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
};