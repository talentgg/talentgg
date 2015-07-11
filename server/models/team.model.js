var Sequelize = require( 'sequelize' );
var db = require( '../config/db.js' );

var Team = db.define( 'team', {

  //Standard fields
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  teamName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },

  //Team-specific schema
  data: {
    //This is for storing team-level data, similar to bio
    type: Sequelize.JSON,
    defaultValue: {}
  },
  members: {
    //This is for storing the members that are part of the team
    type: Sequelize.JSON,
    defaultValue: []
  },
  game: {
    //This is for storing the team's game data, should only be one game
    type: Sequelize.JSON,
    defaultValue: {}
  }

} );

Team.sync();

module.exports = Team;
