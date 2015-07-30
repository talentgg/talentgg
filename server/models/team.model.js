var Sequelize = require( 'sequelize' );
var db = require( '../config/db.js' );

var Team = db.define( 'team', {

  //Standard fields
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  lookupName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  //Team-specific schema
  profile: {
    //This is for storing team-level data, similar to bio
    type: Sequelize.JSON,
    defaultValue: {
      teamName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      times: {
        "weekdays": false,
        "weeknights": false,
        "weekends": false
      },
      purpose: {
        "Casual": false,
        "Ranked": false,
        "3v3": false,
        "5v5": false
      },
      about: "You haven't filled this out yet",
      tagLine: "You haven't filled this out yet"
    }
  },
  ratings: {
    //This is for storing the user's attributes
    type: Sequelize.JSON,
    defaultValue: {
      dominance: 0,
      adaptable: 0,
      blunt: 0,
      collaborative: 0,
      brute: 0,
      aggressive: 0,
      boundaries: 0,
      loud: 0,
      committed: 0,
      ambition: 0
    }
  },
  ads: {
    type: Sequelize.JSON,
    defaultValue: {
      data: []
    }
  },
  teamCaptain: {
    type: Sequelize.INTEGER
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
