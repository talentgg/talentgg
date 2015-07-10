var User = require( '../models/usermodel' );
var Sequelize = require( 'sequelize' );
var db = require( '../db/db' );

module.exports = {

  // signup / register a user
  register: function( req, res, next ) {
    // register is provided by passport
    var newUser = User.build( {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    } );

    newUser.save().complete( function( err ) {
      if ( err ) {
        console.log( 'Error in Inserting Record' );
      } else {
        console.log( 'Data successfully inserted' );
      }
    } );
  }
}
