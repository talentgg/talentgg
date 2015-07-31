var Team = require( '../controllers/team.controller.js' );
var passport = require( 'passport' );

// team routes here
module.exports = function( app ) {

  //register your team
  app.post('/team/register', function(req, res){
    Team.register(req, res);
  });

  // get team profile
  app.get('/team/profile/*', function(req, res){
    Team.getProfile(req, res);
  });

  app.get('/team/id/*', function(req, res){
    Team.getById(req, res);
  });


   // get team profile
  app.get('/team/all', function(req, res){
    Team.getAllProfiles(req, res);
  });

  //update team profile
  app.post('/team/update/*', function(req, res){
    Team.updateProfile(req, res);
  });

  app.post('/team/addad/*', function(req, res){
    Team.addAd(req, res);
  });

  app.post('/team/removeFromAd', function(req, res){
    Team.removeFromAd(req, res);
  });

  app.post('/team/invite', function(req, res){
    Team.invite(req, res);
  });

  app.post('/team/applyToTeam',function(req, res){
    Team.applyToTeam(req, res);
  });

  app.post('/team/addToTeam', function(req, res){
    Team.addToTeam(req, res);
  });

  app.post('/team/removeAd', function(req, res){
    Team.removeAd(req, res);
  });

  app.post('/team/removeTeamMember', function(req, res){
  console.log('i get the request');
  Team.removeTeamMember(req, res);
  });

};
