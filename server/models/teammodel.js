var Sequelize = require('sequelize');
var pg = require('pg').native;
var PassportLocalStrategy = require('passport-local').Strategy;

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
