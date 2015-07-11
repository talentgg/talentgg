var Sequelize = require( 'sequelize' );
var DataTypes = require( '../../node_modules/sequelize/lib/data-types' );
var PassportLocalStrategy = require( 'passport-local' ).Strategy;
var db = require( '../config/db.js' );

var Question = db.define( 'question', {

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
  questionText: Sequelize.STRING,
  category: Sequelize.STRING,
  answersText: Sequelize.ARRAY,
  answersEffect: Sequelize.ARRAY,
} );

Question.sync();

module.exports = Question;
