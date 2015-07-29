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


  app.post('/team/invite', function(req, res){
    Team.invite(req, res);
  });

  app.post('/team/applytoteam',function(req, res){
    Team.applytoteam(req, res);
  });

  app.post('/team/addtoteam', function(req, res){
    Team.addtoteam(req, res);
  }); 

};
