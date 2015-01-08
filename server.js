'use strict';

// Module dependencies.
var express = require('express'),
    session = require('express-session'),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    http = require('http'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    mongoStore = require('connect-mongo')(session),
    errorHandler = require('errorhandler'),
    config = require('./lib/config/config');

//var connect = require('connect');
var app = express();

// Connect to database
var db = require('./lib/db/mongo').db;

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

var pass = require('./lib/config/pass');

// App Configuration

// app.configure('development', function(){
//   // app.use(express.static(path.join(__dirname, '.tmp')));
//   app.use(express.static(path.join(__dirname, 'www')));
//   app.use(express.errorHandler());
//   app.set('views', __dirname + '/www');
// });

// app.configure('production', function(){
//   app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
//   app.use(express.static(path.join(__dirname, 'public')));
//   app.set('views', __dirname + '/www/app/views');
// });

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  // app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(__dirname + '/www'));
  //app.use(express.static(path.join(__dirname, 'www')));
  app.use(errorHandler());
  app.set('views', __dirname + '/www');
  console.log("inside development");
}

 app.engine('html', require('ejs').renderFile);
 app.set('view engine', 'html');
 //app.use(express.logger('dev'));
 app.use(morgan('dev'));

// cookieParser should be above session
//app.use(express.cookieParser());
app.use(cookieParser());

// bodyParser should be above methodOverride
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json
app.use(methodOverride()); 

// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(session({ secret: 'session secret key',
//                    saveUninitialized: true,
//                   resave: true }));

// express/mongo session storage
app.use(session({
  secret: 'MEAN',
  store: new mongoStore({
    url: config.db,
    collection: 'sessions'
  }),
  resave: true,
  saveUninitialized: true
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());

//routes should be at the last
//app.use(app.router);

//Bootstrap routes
// require('./lib/config/routes')(app);


var temp = express.Router();

temp.get(function(req, res, next) {
    res.sender('index');
});

// call our router we just created
app.use('/', temp);

require('./lib/config/routes')(app);

// app.get('/', function(req,res) {
//   res.sender('index');
// });

// Start server
var port = process.env.PORT || 3002;
console.log("server port: " + port);
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
