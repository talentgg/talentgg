var express = require('express');
var path = require('path');
var app = express();
var config = require('./config/config');

//auth middleware
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User = require('./models/user.model');

//view layer
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

//middleware injection
app.use(express.static(__dirname + '/../dist'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'keyboard cat'
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routers
require('./routes/user.routes.js')(app);
require( './routes/team.routes.js' )( app );
require('./routes/questions.routes.js')(app);

app.listen(config.port);
console.log('Listening on port ' + config.port);
