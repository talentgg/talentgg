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
        res.json({teams: user.teams});
      });
    });
  },

  updateProfile: function(req, res, next) {
      var getName = req.url.split('/')[3];
      Team.findOne({
          where: {
            profile: {
              teamName: getName
            }
          }
        })
        .then(function(teamProfile) {
            var profile = req.body;
            profile.teamName = getName;
            Team.update({
                profile: profile
              }, {
                where: {
                  id: teamProfile.id
                }
              })
              .then(function() {
                res.redirect('/#/');
              });
          });
      },



  getProfile: function( req, res, next ){
    var getName = req.url.split('/')[3];
    Team.findOne({where: {
      profile: {
        teamName: getName
      }
    }})
      .then(function(teamProfile) {
        deepBoolean(teamProfile.profile);
        deepBoolean(teamProfile.ads);
        res.json(teamProfile);
     });
   },

  getById: function( req, res, next ){
    var getName = req.url.split('/')[3];
    Team.findOne({where: {
      id: {
        teamName: getName
      }
    }})
       .then(function(teamProfile) {
        deepBoolean(teamProfile.profile);
        deepBoolean(teamProfile.ads);
        res.json(teamProfile);
     });
   },


  getAllProfiles: function( req, res, next ){
    Team.findAll()
    .then(function (teamProfiles) {
      res.json(teamProfiles);
    });
  },
  addAd: function(req, res, next) {
  var getName = req.url.split('/')[3];
  Team.findOne({
      where: {
        profile: {
          teamName: getName
        }
      }
    })
    .then(function(teamProfile) {
      var newAds = teamProfile.ads.data;
      var newAd = req.body;
      newAd.applicants = [];
      newAds.push(newAd);
      Team.update({
        ads: {
          data: newAds
        }
      }, {
        where: {
          id: teamProfile.id
        }
      });
    });
  },

  invite: function(req, res, next){

  },
  applytoteam: function(req, res, next){
    var adUpdate;
    Team.findById(req.body.teamid).then(function(teamData){
          adUpdate = teamData.ads.data;
          adUpdate[req.body.adIndex].applicants.push({id: req.session.passport.user, name: req.body.name, ratings: req.body.ratings});
        })
          .then(function(){
            Team.update({ads: {data: adUpdate}}, {where: {id: req.body.teamid}});
          });
  },
  addtoteam: function(req, res, next){
    Team.findById(Number(req.body.teamId))
      .then(function(teamData){
        var updatedAds = teamData.ads.data;
        updatedAds.splice(req.body.ad, 1);
        var updatedMembers = teamData.members;
        updatedMembers.push({id: req.body.userid, name: req.body.displayName, isAdmin: false});
        Team.update({ads: {data: updatedAds}, members: updatedMembers}, {where: {id: req.body.teamId}});
      });
  }
};


function deepBoolean(obj){
  if(typeof obj !== 'object') {
    if(obj === 'true' || obj === 'false'){
      return obj === 'true';
    }
  }
  if (Array.isArray(obj)) {
    obj.forEach(function(val){
      return deepBoolean(val);
    });
  } else if (typeof obj === 'object') {
    for (var key in obj){
      obj[key] = deepBoolean(obj[key]);
    }
  }
  return obj;
}
