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

  app.get('/profile', function(req, res){ // Profile data from bio
    User.getOwnProfile(req, res);
  });

  app.post('/profile', function(req, res){ // Update bio data
    User.updateBio(req, res);
  });

  app.post('/settings', function(req, res){
    User.updateSettings(req, res);
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
