// dependancies
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
// var spotify = require("spotify");
// node
var request = require("request");
var fs = require("fs");

// twitter
var getMyTweets = function() {

  // var client = new Twitter(keys.twitterKeys);

  var client = new Twitter ({
        consumer_key : keys.twitterKeys.consumer_key,
        consumer_secret : keys.twitterKeys.consumer_secret,
        access_token_key : keys.twitterKeys.access_token_key,
        access_token_secret : keys.twitterKeys.access_token_secret,
    });

  var params = {
    screen_name: "melaniew1357",
    count: 20,
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


var getMeSpotify = function(songName) {

  if (songName === undefined) {
    songName = "What\"s my age again";
  }
  
  var spotify = new Spotify({
    id: '21b269d9148a4679be42ec894486fb8b',
    secret: '97cad2d8cc78492797be0b251d552c0c'
  });

  spotify.search({
    type: "track",
    query: songName
  }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    var songs = data.tracks.items;

    for (var i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("artist(s): " + songs[i].artists.map(getArtistNames));
      console.log("song name: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("-----------------------------------");
    }
  });
};

// OMDB
var getMeMovie = function(movieName) {

  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
      console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
    }
  });
};

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } 
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }

  });
};

var pick = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
      getMyTweets();
      break;
    case "spotify-this-song":
      getMeSpotify(functionData);
      break;
    case "movie-this":
      getMeMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
  }
};

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);