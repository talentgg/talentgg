var express = require( 'express' );
var path = require( 'path' );
var app = express();
var port = process.env.PORT || 3000;

//auth middleware
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.set( 'views', path.join( __dirname, "views" ) );
app.set( 'view engine', 'ejs' );

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

//add user specific routes
require( './routes/userroutes.js' )( app );
// require( './routes/teamroutes.js' )( app );

app.listen( port );
console.log( 'Listening on port ' + port );
