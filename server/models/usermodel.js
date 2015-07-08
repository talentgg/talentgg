var Sequelize = require('sequelize');
var pg = require('pg').native;
var PassportLocalStrategy = require('passport-local').Strategy;

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

User.sync();
