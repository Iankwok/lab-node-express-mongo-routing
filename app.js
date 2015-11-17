var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var path           = require('path');
var debug          = require("debug");
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');

var passport     = require('passport');
var flash        = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var moongoose = require('mongoose');
moongoose.connect('mongodb://localhost/recipes');
// var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/recipes';
// moongoose.connect(mongoUri);

app.use(logger('dev'));
app.use(cookieParser());
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//  development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

var routes = require('./config/routes');
app.use(routes);

var router = express.Router();
router.get('/', function(req, res){
  res.redirect('/recipes');
})

require('./config/passport')(passport);
  app.use(function (req, res, next) {
    global.user = req.user;
    next()
  });

// app.listen(3000);
app.listen(process.env.PORT || 3000 )
console.log("Server Started");
