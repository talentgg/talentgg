var Team = require( '../controllers/team.controller.js' );
var passport = require( 'passport' );

// team routes here
module.exports = function( app ) {

  //register your team
  app.post('/team/register', function(req, res){
    Team.register(req, res);
    console.log('<----logs----->');
    console.log(req.body);
  });

  // get team profile
  app.get('/team/*', function(req, res){
    Team.getProfile(req, res);
  });

   // get team profile
  app.get('/team/all', function(req, res){
    Team.getAllProfiles(req, res);
  });

  //update team profile
  app.post('/team/update/*', function(req, res){
    Team.updateProfile(req, res);
  });


};
