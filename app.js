var express        = require('express');
var path           = require('path');
var debug          = require("debug");
var logger         = require('morgan');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');

var app = express();
var router = express.Router();

var moongoose = require('mongoose');
// moongoose.connect('mongodb://localhost/tweets');
var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/tweets';
moongoose.connect(mongoUri);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(require('./controllers/tweets'));

app.listen(3000);
console.log("Server Started");
