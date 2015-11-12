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

//Delete
router.delete("/tweets/:id/edit", function(req, res){
  Tweet.remove({ '_id' : req.params.id }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });

    res.redirect('/tweets');
  });

module.exports = router;
