var User = require('../controllers/user.controller.js');
var passport = require('passport');
var handle = require('./handler');
var db = require('../config/db.js');

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
    User.getProfile(req, res);
  });

  app.post('/profile', function(req, res){ // Update bio data
    User.updateBio(req, res);
  });

  app.post('/settings', function(req, res){
    User.updateSettings(req, res);
  })

  // External API routes

  // TODO: Remove these as routes and have them exist as calls within necessary functions

  // Gets summoner data based on summoner name
  app.get(/\/lol\/.*\/.*\.json/, function(req, res) { //i.e. localhost:3000/lol/na/nexas.json
    var url = req.url.split('/');
    handle.userInfo(url[3].slice(0, -5), url[2], function(data) {
      res.json(data);
    })
  });
};
