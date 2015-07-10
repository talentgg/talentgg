var Sequelize = require( 'sequelize' );
var DataTypes = require( '../../node_modules/sequelize/lib/data-types' );
var PassportLocalStrategy = require( 'passport-local' ).Strategy;
var db = require( '../db/db' );

var User = db.define( 'user', {

  //Defaulted Fields
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  //Static Fields
  username: Sequelize.STRING( 16 ),
  password: Sequelize.STRING( 32 ), // secure this after we pick a strategy
  email: Sequelize.STRING, // parse this
  timezone: Sequelize.INTEGER, // +- GMT
  language: Sequelize.STRING,
  games: Sequelize.JSON, // i think there's a better way of doing this
  seeking: Sequelize.STRING,

  // ESSAY FIELDS
  about: Sequelize.STRING( 1024 ),
  style: Sequelize.STRING( 1024 ),
  favGames: Sequelize.STRING( 1024 ),
  lookingFor: Sequelize.STRING( 1024 ),

  // LoL specific                        // not sure if this is in user
  avatar: Sequelize.STRING( 1024 ),
  level: Sequelize.INTEGER,
  rank: Sequelize.INTEGER,
  id: Sequelize.STRING, // string or int?

  // PROFILE RATINGS
  // leadership
  dominance: Sequelize.INTEGER,
  adaptability: Sequelize.INTEGER,

  // playing style
  aggressive: Sequelize.INTEGER,      // aggressive / patient
  tank: Sequelize.INTEGER,            // tank / technical
  support: Sequelize.INTEGER,         // supportive / independent
  troll: Sequelize.INTEGER,           // troll / polite
  loud: Sequelize.INTEGER,            // loud / calm

  commitment: Sequelize.INTEGER,
  ambition: Sequelize.INTEGER
} );

User.sync();

