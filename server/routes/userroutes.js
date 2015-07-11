var UserController = require( '../controllers/user.controller.js' );
var User = require( '../models/usermodel' ).User;
var passport = require( 'passport' );
var handle = require( './handler' );
var LocalStrategy = require('passport-local').Strategy;

//LOCAL STRATEGY BELOW
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


module.exports = function( app ) {

  app.get( '/', function( req, res ) {
    res.render( 'index' );
  } );

  app.post( '/register', function( req, res, next ) {
    UserController.register( req, res, next );
  } );

   app.post('/login', passport.authenticate('local'), function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.redirect('/');
    } );

  // app.post('/signout', function(req, res, next){
  //   User.signout(req, res, next);
  // });

  // app.post('/user/password', utils.checkAuth, function(req, res, next){
  //   User.changePassword(req, res, next);
  // });

  // app.post('/user', utils.checkAuth, function(req, res, next){
  //   User.update(req, res, next);
  // });

  // League API route
  app.get( /\/lol\/.*\/.*\.json/, function( req, res ) { //i.e. localhost:3000/lol/na/nexas.json
    var url = req.url.split( '/' );
    handle.userInfo( url[ 3 ].slice( 0, -5 ), url[ 2 ], function( data ) {
      res.json( data );
    } )
  } );
};
