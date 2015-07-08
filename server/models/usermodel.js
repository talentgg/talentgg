var Sequelize = require('sequelize');
var pg = require('pg').native;
var PassportLocalStrategy = require('passport-local').Strategy;

var User = sequelize.define('user', {

  //FIXED FIELDS
  username: Sequelize.STRING(16),
  password: Sequelize.STRING(32), // secure this after we pick a strategy
  email: Sequelize.STRING,    // parse this
  timezone: Sequelize.INTEGER,// +- GMT
  language: Sequelize.STRING,
  //games: Sequelize.STRING,    // i think there's a better way of doing this
  seeking: Sequelize.STRING,
  lastUpdated: Sequelize.NOW,
  id: Sequelize.UUID,

  // ESSAY FIELDS
  about: Sequelize.STRING(1024),
  style: Sequelize.STRING(1024),
  favGames: Sequelize.STRING(1024),
  lookingFor: Sequelize.STRING(1024),

  // LoL specific                        // not sure if this is in user
  avatar: Sequelize.STRING(1024),
  level: Sequelize.INTEGER,
  rank: Sequelize.INTEGER,
  id: Sequelize.STRING,                 // string or int?

  // PROFILE RATINGS
  //leadership
  dominance: Sequelize.INTEGER,
  adaptability: Sequelize.INTEGER,
  //playing style
  aggressive: Sequelize.INTEGER,      // aggressive / patient
  tank: Sequelize.INTEGER,            // tank / technical
  support: Sequelize.INTEGER,         // supportive / independent
  troll: Sequelize.INTEGER,           // troll / polite
  loud: Sequelize.INTEGER,            // loud / calm
  commitment: Sequelize.INTEGER,
  ambition: Sequelize.INTEGER
});

User.sync();

var Team = sequelize.define('team', {

  //FIXED FIELDS
  teamname: Sequelize.STRING(16),    
  timezone: Sequelize.INTEGER,// +- GMT
  language: Sequelize.STRING,
  game: Sequelize.STRING,
  seeking: Sequelize.STRING,
  lastUpdated: Sequelize.NOW,
  id: Sequelize.UUID,

  // ESSAY FIELDS
  who: Sequelize.STRING(1024),
  style: Sequelize.STRING(1024),
  when: Sequelize.STRING(1024),
  lookingFor: Sequelize.STRING(1024)

  // LoL specific                        // it'll just display the team members

  // // PROFILE RATINGS
  // //leadership
  // dominance: Sequelize.INTEGER,
  // adaptability: Sequelize.INTEGER,
  // //playing style
  // aggressive: Sequelize.INTEGER,      // aggressive / patient
  // tank: Sequelize.INTEGER,            // tank / technical
  // support: Sequelize.INTEGER,         // supportive / independent
  // troll: Sequelize.INTEGER,           // troll / polite
  // loud: Sequelize.INTEGER,            // loud / calm
  // commitment: Sequelize.INTEGER,
  // ambition: Sequelize.INTEGER
});

Team.sync();
