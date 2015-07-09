var Sequelize = require( 'sequelize' );
var config = require( '../config/config' );

module.exports = new Sequelize( config.psql );
