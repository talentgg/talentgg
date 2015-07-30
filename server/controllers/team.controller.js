var Team = require('../models/team.model');
var User = require('../models/user.model');
var passport = require('passport');

module.exports = {

  register: function( req, res, next ) {
    var team;
    User.findOne({where: {id: req.session.passport.user}})
    .then(function(user){
      Team.create({
        lookupName: urlify(req.body.teamName),
        profile: req.body,
        teamCaptain: user.id,  // redundant, but this gets checked a lot and saves having to iterate over keys every time
        members: [{
          id: user.id,
          name: user.displayName,
          ratings: user.ratings,
          avatar: user.games.avatar}]
      })
      .then(function(teamData){
        team = teamData;
        user.teams.push({id: team.id, teamName: req.body.teamName, url: urlify(req.body.teamName)});
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
    var getName = urlify(req.url.split('/')[3]);
    Team.findOne({
      where: {
        lookupName: getName
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
    var getName = urlify(req.url.split('/')[3]);
    Team.findOne({where: { lookupName: getName }})
    .then(function(teamProfile) {
      deepBoolean(teamProfile.profile);
      deepBoolean(teamProfile.ads);
      res.json(teamProfile);
    });
  },

  getById: function( req, res, next ){
    var getName = req.url.split('/')[3];
    Team.findOne({where: {
      id: getName
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
  var getName = urlify(req.url.split('/')[3]);
  Team.findOne({
      where: {
        lookupName: getName
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

  applyToTeam: function(req, res, next){
    Team.findById(req.body.teamId)
    .then(function(teamData){
      teamData.ads.data[req.body.adIndex].applicants.push({
        id: req.session.passport.user,
        name: req.body.name,
        ratings: req.body.ratings,
        region: req.body.region
      });
      deepBoolean(teamData.ads.data);
      Team.update({ads: teamData.ads}, {where: {id: req.body.teamId}})
      .then(function(){
        res.json({ads: teamData.ads});
      })
    });
  },

  addToTeam: function(req, res, next){
    Team.findById(req.body.teamId)
    .then(function(teamData){
      var updatedAds = deepBoolean(teamData.ads.data);
      var laneUpdate = deepBoolean(teamData.ads.data[req.body.ad].lanes);
      var roleUpdate = deepBoolean(teamData.ads.data[req.body.ad].roles);
      updatedAds.splice(req.body.ad, 1);
      teamData.members.push({
        id: req.body.userId,
        name: req.body.name,
        lanes: laneUpdate,
        roles: roleUpdate,
        ratings: req.body.ratings,
        avatar: req.body.avatar,
        isAdmin: false
      });
      Team.update({ads: {data: updatedAds}, members: teamData.members}, {where: {id: req.body.teamId}})
      .then(function(){
        User.findById(req.body.userId)
        .then(function(userData){
          userData.teams.push({
            id: teamData.id,
            teamName: teamData.profile.teamName,
            url: teamData.profile.teamName.toLowerCase().replace(' ', '-')
          })
          User.update({teams: userData.teams},{where: {id: req.body.userId}})
          .then(function(){
            res.json({ads: {data: updatedAds}, members: teamData.members});
          })
        })
      })
    });
  },
  removeTeamMember: function(req, res) {


  },
  removeFromAd: function( req, res, next ){
    var obj;
    Team.findById(req.body.teamId)
    .then(function(teamData){
      obj = teamData.ads.data[req.body.adIndex].applicants;
      for(var i = 0; i < obj.length; i++){
        if(obj[i].name === req.body.name){
          obj.splice(i, 1);
          teamData.ads.data[req.body.adIndex].applicants = obj;
          Team.update({ads: teamData.ads}, {where: {id: req.body.teamId}})
          .then(function(){
            res.json({ads: teamData.ads});
          })
        }
      }
    })
  },

  removeAd: function(req, res){ //teamId
    Team.findById(req.body.teamId)
    .then(function(teamData){
      teamData.ads.data.splice(req.body.index, 1);
      deepBoolean(teamData.ads.data);
      Team.update({ads: teamData.ads}, {where: {id: req.body.teamId}})
      .then(function(){
        res.json({ads: teamData.ads});
      })
    })
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

function urlify(str){
  return str.toLowerCase().replace(' ', '-').replace('%20', '-');
}
