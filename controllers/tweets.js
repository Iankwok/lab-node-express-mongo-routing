var express    = require('express'),
    router     = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var Tweet = require("../models/tweet");

router.get("/tweets", function(req, res){
  Tweet.find({}, function (err, tweets) {
    res.render('tweets/index', { tweets: tweets });
  });
})

//CREATE
router.post("/tweets", function(req, res){
  Tweet.create(req.body.tweets, function (err, tweet) {
    if (err){
      res.send("something wrong happened"+ err)
    } else {
      res.redirect('/tweets');
    }
  });
})

// DELETE
router.delete("/tweets/:id", function(req, res){
  for(i in tweets){
    if(tweets[i]["id"] == req.params.id){
      delete tweets[i]
    }
  }
  res.json({message : 'deleted' });
});


module.exports = router;