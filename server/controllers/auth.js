var passport = require( 'passport-local' ).Strategy;
var User = require( '../models/user.model' );

module.exports = {
  localStrategy: new passport( {
      username: 'username',
      password: 'password'
    },
    function( username, password, done ) {
      var User = require( './User' ).User;
      User.find( {
        username: username
      } ).success( function( user ) {
        if ( !user ) {
          return done( null, false, {
            message: 'Nobody here by that name'
          } );
        }
        if ( user.password !== password ) {
          return done( null, false, {
            message: 'Wrong password'
          } );
        }
        return done( null, {
          username: username
        } );
      } );
    }
  ),
  validPassword: function( password ) {
    return this.password === password;
  },
  serializeUser: function( user, done ) {
    done( null, user );
  },
  deserializeUser: function( obj, done ) {
    done( null, obj );
  }
};
