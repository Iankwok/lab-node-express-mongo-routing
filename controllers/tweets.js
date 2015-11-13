var express    = require('express'),
    router     = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var Tweet = require("../models/tweet");

//INDEX
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

//EDIT
router.get("/tweets/:id/edit", function(req, res){
  Tweet.findById(req.params.id, function(err, tweet){
    if (err) res.json(err);
    res.render('tweets/edit', { tweet: tweet });
  })
})

//UPDATE
router.put("/tweets/:id", function(req, res){
  Tweet.findByIdAndUpdate(req.params.id, req.body.tweet, function (err, tweet) {
    console.log(req.body.tweet);
    console.log(tweet);
    if (err) {res.send("something wrong happened"+ err) }
    else {
      res.redirect('/tweets');
    }
  });
})

//DELETE
router.post("/tweets/:id/delete", function(req, res){
  Tweet.findByIdAndRemove(req.params.id, function(err, tweet) {
    if (err){
      res.send("something wrong happened"+ err)
    } else {
      res.redirect('/tweets');
    }
  });
})
module.exports = router;
