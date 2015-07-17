var User = require( '../models/user.model' );
var passport = require( 'passport' );
var bcrypt = require('bcryptjs');

function generateHash(password){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
      return hash;
    })
  })
}


module.exports = {

  //create a new User
  register: function( req, res, next ) {
    var username = req.body.username, password = req.body.password;
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(password, salt, function(err, hash){
        User.create({
          username: username,
          hash: hash,
          displayName: "newbro" + Math.floor(Math.random()*100000)
        })
        .then(function(data){
          passport.authenticate('local')(req, res, function(){
            res.redirect('/');
          })
        })
        .catch(function(err){
          console.log(err);
          res.send("Something went wrong when trying to create your account.\nPlease try again.")
        });
      })
    })
  },

  logout: function( req, res ) {
    res.clearCookie('connect.sid');
    req.session.destroy(function(err){
      res.redirect('/');
    })
  },

  getProfile: function(req, res){
    User.findById(req.session.passport.user)
    .then(function(data){
      var obj = data;

      // Masking private information
      obj.hash = false;
      obj.username = false;
      res.json(obj);
    });
  },

  updateBio: function(req, res){
    User.findById(req.session.passport.user)
    .then(function(data){
      User.update({bio: req.body},{where: {id: req.session.passport.user}});
    });
  }

};
