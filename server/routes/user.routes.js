var User = require('../controllers/user.controller.js');
var passport = require('passport');

module.exports = function(app) {

  // User API routes

  app.post('/register', function(req, res, next) { // Registers new users and persists on psql
    User.register(req, res, next);
  });

  app.post('/login', passport.authenticate('local'), function(req, res) { // Logs in users
    res.redirect('/');
  });

  app.post('/logout', function(req, res, next) { // Logs out users
    User.logout(req, res, next);
  });

  app.post('/password', function(req, res, next) { // Changes password
    User.changePassword(req, res, next);
  });

  // TODO: Create a route for updating email/displayName

  app.get( '/user/all', function( req, res ) {
    User.getAllProfiles(req, res);
  } );

  app.get('/profile', function(req, res){ // Personal account data
    User.getOwnProfile(req, res);
  });

  app.post('/profile', function(req, res){ // Update bio data
    User.updateBio(req, res);
    console.log('data: ');
    console.log(req.body);
  });

  app.post('/ratings', function(req, res){ // Update ratings
    User.updateRatings(req, res);
  });

  app.post('/settings', function(req, res){ // Update account information
    User.updateSettings(req, res);
  });

  app.post('/setSummoner', function(req, res){ // Update summoner information
    User.setSummoner(req, res);
  });

  app.post('/verifySummoner', function(req, res){
    User.verifySummoner(req, res);
  });

  app.post('/updateSummoner', function(req, res){
    User.updateSummoner(req, res);
  });

  app.get(/\/username\/.*/, function(req, res){ // Fetches a user by displayName, case sensitive!
    User.profileByName(req, res, req.url.split('/')[2]);
  });

  app.get(/\/userid\/.*/, function(req, res){ // Fetches a user by id
    User.profileById(req, res, req.url.split('/')[2]);
  });

  // External API routes

  // Gets summoner data based on summoner name
  app.get(/\/lol\/.*\/.*\.json/, function(req, res) { //get summoner profile info; localhost:3000/lol/na/nexas.json
    if(!req.session.passport.user) {
      res.sendStatus(401);
    } else {
      User.lolapi(req, res, req.url.split('/')[2], req.url.split('/')[3].slice(0, -5));
    }
  });


};
