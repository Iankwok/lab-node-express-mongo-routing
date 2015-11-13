var mongoose = require('mongoose');

var TweetsSchema = new mongoose.Schema({
  name:  {type:String, required: true},
  tweet: {type:String, required: true}
});

var Tweet = mongoose.model('Tweets', TweetsSchema);
module.exports = Tweet;