var express    = require('express'),
    router     = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var Recipe = require("../models/recipe");

//INDEX
router.get("/recipes", function(req, res){
  Recipe.find({}, function (err, recipes) {
    res.render('recipes/index', { recipes: recipes });
  });
})

//CREATE
router.post("/recipes", function(req, res){
  Recipe.create(req.body.recipes, function (err, recipe) {
    if (err){
      res.send("something wrong happened"+ err)
    } else {
      res.redirect('/recipes');
    }
  });
})

//EDIT
router.get("/recipes/:id/edit", function(req, res){
  Recipe.findById(req.params.id, function(err, recipe){
    if (err) res.json(err);
    res.render('recipes/edit', { recipe: recipe });
  })
})

//UPDATE
router.put("/recipes/:id", function(req, res){
  Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function (err, recipe) {
    if (err) {res.send("something wrong happened"+ err) }
    else {
      res.redirect('/recipes');
    }
  });
})

//DELETE
router.post("/recipes/:id/delete", function(req, res){
  Recipe.findByIdAndRemove(req.params.id, function(err, recipe) {
    if (err){
      res.send("something wrong happened"+ err)
    } else {
      res.redirect('/recipes');
    }
  });
})
module.exports = router;
