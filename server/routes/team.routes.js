var Team = require( '../controllers/team.controller.js' );
var passport = require( 'passport' );
var handle = require( './handler' );
var db = require( '../config/db.js' );

// team routes here
module.exports = function( app ) {

  //register your team
  app.post( '/team/register/*', function( req, res ) {
    Team.register(req);
  } );

  // get team profile
  app.get( '/team/profile/*', function( req, res ) {
    var profile = Team.getProfile(req);
    res.send( profile );
  } );

  //update team profile
  app.post( '/team/update/*', function( req, res ) {
    Team.updateProfile(req);
  } );

  
};
