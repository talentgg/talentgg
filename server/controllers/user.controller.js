var User = require( '../models/user.model' );
var passport = require( 'passport' );

module.exports = {

  //create a new User
  register: function( req, res, next ) {
    User.register( req.body.username, req.body.password, function( er, user ) {
      if ( er ) {
        console.log( 'Could not create user ', req.body.username, ' ', er );
        return res.json( {
          user: user,
          error: er
        } );
      }
      passport.authenticate( 'local' )( req, res, function() {
        res.sendFile('main.html', {root: 'dist'});
      } );
    } );
  },

  logout: function( req, res ) {
    res.clearCookie('connect.sid');
    req.session.destroy(function(err){
      res.sendFile('index.html', {root: 'dist'});
    })
  },

  changePassword: function( req, res, next ) {
    User.update( {
        activationKey: req.body.password
      }, {
        where: {
          username: req.body.username
        }
      } )
      //    .then(function() {
      //    console.log("Password Updated!");
      //    }).error(function(err) {
      //   console.log("Update Failed !");
      // })
  },

  getProfile: function(req, res){
    User.findOne({where: {username: req.session.passport.user}})
    .then(function(data){
      var obj = data;

      //This will likely become a function if it gets reused

      delete obj.hash;
      delete obj.salt;
      delete obj.createdAt;
      delete obj.updatedAt;
      delete obj.username;
      delete obj.resetPasswordKey;
      delete obj.activationKey;
      res.json(obj);
    });
  },

  updateBio: function(req, res){
    User.findOne({where: {username: req.session.passport.user}})
    .then(function(data){
      User.update({bio: req.body},{where: {username: req.session.passport.user}});
    });
  }

};
