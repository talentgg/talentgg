var Sequelize = require( 'sequelize' );
var passportMagic = require( '../config/magic' );
var db = require( '../config/db.js' );

var User = passportMagic.defineUser( db, {
  //This implementation automatically includes the following fields:
  //id, username, hash, salt, activationKey, resetPasswordKey, createdAt, updatedAt
  //we will be treating the user's email as their username

  displayName: {
    //This is the user's in-app name, defaulted to something like newbro123456
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    defaultValue: "newbro" + Math.floor( Math.random() * 100000 )
  },
  bio: {
    //This is for storing the user's essay data and perhaps any other person-level data
    type: Sequelize.JSON,
    defaultValue: {}
  },
  teams: {
    //This is for storing the teams that the user is on
    type: Sequelize.JSON,
    defaultValue: []
  },
  games: {
    //This is for storing the user's game data broken down into sub-objects for each game
    type: Sequelize.JSON,
    defaultValue: {}
  }

} );

User.sync();

module.exports = User;
