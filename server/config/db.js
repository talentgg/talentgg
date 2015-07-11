var Sequelize = require( 'sequelize' );
var config = require( './config' );

console.log( 'config.psql is: ' + config.psql );

module.exports = new Sequelize( config.psql );
