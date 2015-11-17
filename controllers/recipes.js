var Recipe = require("../models/recipe");

//INDEX
function index(req, res){
  Recipe.find({}, function (err, recipes) {
    res.render('recipes/index', { recipes: recipes });
  });
}

//CREATE
function create(req, res){
  Recipe.create(req.body.recipes, function (err, recipe) {
    if (err){
      res.send("something wrong happened"+ err)
    } else {
      res.redirect('/recipes');
    }
  });
}

//EDIT
function edit(req, res){
  Recipe.findById(req.params.id, function(err, recipe){
    if (err) res.json(err);
    res.render('recipes/edit', { recipe: recipe });
  })
}

//UPDATE
function update(req, res){
  Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function (err, recipe) {
    if (err) {res.send("something wrong happened"+ err) }
    else {
      res.redirect('/recipes');
    }
  });
}

//DELETE
function remove(req, res){
  Recipe.findByIdAndRemove(req.params.id, function(err, recipe) {
    if (err){
      res.send("something wrong happened"+ err)
    } else {
      res.redirect('/recipes');
    }
  });
}

// module.exports = router;
module.exports = {
  index: index,
  create: create,
  edit: edit,
  update: update,
  remove: remove
}
