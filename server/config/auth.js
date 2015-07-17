var path = require('path');
var bcrypt = require('bcryptjs');

//auth middleware
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User = require('../models/user.model');

module.exports = function(app){

  //view layer
  app.set('views', path.join(__dirname, "views"));

  //middleware injection

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard cat'
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  //authentication customization

  passport.use(new LocalStrategy(
    function(username, password, done){
      User.findOne({where: {username: username}})
      .then(function(data){
        bcrypt.compare(password, data.hash, function(err, verified){
          if(err) throw err;
          if(verified){
            return done(null, data);
          } else {
            console.log("Incorrect password.");
            return done(null, false, {message: "incorrect password"})
          }
        })
      })
      .catch(function(err){
        console.log(err);
      });
    }
  ));
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done){
    User.findById(id)
    .then( function(data) {
      done(null, data);
    })
    .catch(function(err){
      done(err, null);
    });
  });
}
