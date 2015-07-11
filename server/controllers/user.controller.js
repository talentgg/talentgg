var User = require( '../models/user.model' );
var passport = require( 'passport' );

module.exports = {

  //create a new User
  register: function( req, res, next ) {
    console.log( req.body );
    User.register( req.body.username, req.body.password, function( er, user ) {
      if ( er ) {
        console.log( 'Could not create user ', req.body.username, ' ', er );
        return res.json( {
          user: user,
          error: er
        } );
      }
      passport.authenticate( 'local' )( req, res, function() {
        res.render( 'index' );
      } );
    } );
  },

  logout: function( req, res ) {
    req.logout();
    res.end();
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
  }

  //sign in

  //sign out



  //change info

};
