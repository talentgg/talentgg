var Team = require('../models/team.model');
var User = require('../models/user.model');
var passport = require('passport');

module.exports = {

  register: function( req, res, next ) {
    var user, team;
    User.findOne({where: {id: req.session.passport.user}})
    .then(function(userData){
      user = userData;
    })
    .then(function(){
      Team.create({
        profile: req.body,
        teamCaptain: user.id,  // redundant, but this gets checked a lot and saves having to iterate over keys every time
        members: [{id: user.id, name: user.displayName, isAdmin: true}]
      })
      .then(function(teamData){
        team = teamData;
        user.teams.push({id: team.id, teamName: team.profile.teamName});
      })
      .then(function(){
        User.update({teams: user.teams}, {where: {id: req.session.passport.user}});
      })
      .then(function(){
        res.redirect('/#/user-profile');
      });
    });
  },

  updateProfile: function( req, res, next ){

  },

  getProfile: function( req, res, next ){
    var getName = req.url.split('/')[3];
    console.log(getName);
    Team.findOne({where: {
      profile: {
        teamName: getName
      }
    }})
       .then(function (teamProfile) {
         res.json(teamProfile);
     });
   },


  getAllProfiles: function( req, res, next ){
    Team.findAll()
    .then(function (teamProfiles) {
      res.json(teamProfiles);
    });
  }

};
