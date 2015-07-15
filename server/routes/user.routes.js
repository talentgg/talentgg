var User = require('../controllers/user.controller.js');
var passport = require('passport');
var handle = require('./handler');
var db = require('../config/db.js');

module.exports = function(app) {

  app.get('/', handle.isAuth, function(req, res) {
    res.sendFile('main.html', {root: 'dist'});
  });

  app.get('/profile', function(req, res){
    User.getProfile(req, res);
  });

  app.post('/profile', function(req, res){
    User.updateBio(req, res);
  });

  app.post('/register', function(req, res, next) {
    User.register(req, res, next);
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.sendFile('main.html', {root: 'dist'});
  });

  app.post('/logout', function(req, res, next) {
    User.logout(req, res, next);
  });

  app.post('/password', function(req, res, next) {
    User.changePassword(req, res, next);
  });

  app.post('/profile', function(req, res){
    console.log(req.body);
  });

  // League API route
  app.get(/\/lol\/.*\/.*\.json/, function(req, res) { //i.e. localhost:3000/lol/na/nexas.json
    var url = req.url.split('/');
    handle.userInfo(url[3].slice(0, -5), url[2], function(data) {
      res.json(data);
    })
  });
};
