var mongoose = require('mongoose');

var TweetsSchema = new mongoose.Schema({
  name: String,
  tweet: String
});

var Tweet = mongoose.model('Tweets', TweetsSchema);
module.exports = Tweet;