var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require("passport");
var recipesController = require('../controllers/recipes');
var usersController = require('../controllers/users');
// var staticsController = require('../controllers/statics');

// router.route('/')
//   .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

router.route('/recipes')
  .get(recipesController.index)
  .post(recipesController.create)

router.route("/recipes/:id/edit")
  .get(recipesController.edit)

router.route("/recipes/:id")
  .put(recipesController.update)

router.route("/recipes/:id/delete")
  .post(recipesController.remove)

module.exports = router;

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();
  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

router.route("/secret")
  .get(authenticatedUser, usersController.secret);

