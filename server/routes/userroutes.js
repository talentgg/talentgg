var User = require( '../controllers/user.controller.js' );
var passport = require( 'passport' );
var handle = require( './handler' );

module.exports = function( app ) {

  app.get( '/', function( req, res ) {
    res.render( 'index' );
  } );

  app.post( '/register', function( req, res, next ) {
    User.register( req, res, next );
  } );

  // app.post('/signin', passport.authenticate('local'), function(req, res, next) {
  //   User.signin(req, res, next);
  // });

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
