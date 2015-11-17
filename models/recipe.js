var mongoose = require('mongoose');

var RecipesSchema = new mongoose.Schema({
  name:  {type:String, required: true},
  ingredients: {type:String, required: true},
  img: {type:String}
});

RecipesSchema.methods.showPhoto = function() {
  return '/img/' + this.img;
};

var Recipe = mongoose.model('Recipes', RecipesSchema);
module.exports = Recipe;