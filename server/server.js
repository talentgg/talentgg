var express = require( 'express' );
var path = require( 'path' );
var app = express();
var port = require( './config/config' ).port;

//auth middleware
var session = require( 'express-session' );
var passport = require( 'passport' );
var LocalStrategy = require( 'passport-local' ).Strategy;
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var User = require( './models/user.model' );

//view layer
app.set( 'views', path.join( __dirname, "views" ) );
app.set( 'view engine', 'ejs' );

//middleware injection
app.use( express.static( 'public' ) );
app.use( cookieParser() );
app.use( bodyParser() );
app.use( session( {
  secret: 'keyboard cat'
} ) );

app.use( passport.initialize() );
app.use( passport.session() );
passport.use( User.createStrategy() );
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );


//Routers
require( './routes/user.routes.js' )( app );
// require( './routes/teamroutes.js' )( app );



app.listen( port );
console.log( 'Listening on port ' + port );
