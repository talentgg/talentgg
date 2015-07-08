var User = require('../controllers/user.controller.js');
var passport = require('passport');

module.exports = function(app) {

  app.get('/', function(req, res){
    res.render('index');
  });

  // app.post('/register', function(req, res, next) {
  //   User.register(req, res, next);
  // });

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
};
