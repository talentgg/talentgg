var User = require( '../models/team.model' );
var passport = require( 'passport' );

module.exports = {

  getProfile: function( req, res, next ){
    Team.findOne({where: {teamName: req.url.split('/')[2]}})
      .then(function (teamProfile) {
        return teamProfile;
    })
  },

  updateProfile: function( req, res, next ){
    User.update( {
        activationKey: req.body.password
      }, {
        where: {
          username: req.body.username
        }
      } )
  }

}

