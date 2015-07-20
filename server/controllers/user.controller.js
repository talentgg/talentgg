var User = require( '../models/user.model' );
var passport = require( 'passport' );
var bcrypt = require('bcryptjs');
var request = require('request');
var config = require('../config/config');
var gen = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

module.exports = {

  // Own user functions

  register: function( req, res, next ) { // Creates a new user
    var username = req.body.username, password = req.body.password;
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(password, salt, function(err, hash){
        User.create({
          username: username,
          hash: hash,
          displayName: "newbro" + Math.floor(Math.random()*100000)
        })
        .then(function(data){
          passport.authenticate('local')(req, res, function(){
            res.redirect('/');
          })
        })
        .catch(function(err){
          console.log(err);
          res.send("Something went wrong when trying to create your account.\nPlease try again.")
        });
      })
    })
  },

  logout: function( req, res ) { // Destroys session
    res.clearCookie('connect.sid');
    req.session.destroy(function(err){
      res.redirect('/');
    })
  },

  getAllProfiles: function( req, res, next ){
    User.findAll()
    .then(function (teamProfiles) {
      res.json(teamProfiles)
    })
  },

  getOwnProfile: function(req, res){ // Retrieves own profile data
    User.findById(req.session.passport.user)
    .then(function(data){
      var obj = data;

      // Masking private information
      obj.hash = false;
      res.json(obj);
    });
  },

  updateBio: function(req, res){ // Updates bio data
    User.findById(req.session.passport.user)
    .then(function(data){
      User.update({bio: req.body},{where: {id: req.session.passport.user}});
      res.redirect('/#/user-profile');
    });
  },

  updateSettings: function(req, res){ // Updates account data
    User.findById(req.session.passport.user)
    .then(function(data){
      User.update({displayName: req.body.displayName}, {where: {id: req.session.passport.user}});
      res.redirect('/#/user-profile');
    })
  },

  setSummoner: function(req, res){
    var key = "", obj = {}, region = req.body.region.toLowerCase(), name = req.body.name.toLowerCase().replace(' ', '');
    for(var i = 0; i < 20; i++){
      key += gen.charAt(Math.floor(Math.random()*62));
    }
    relay(res, 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + name + '?api_key=' + config.lolapi, function(er, data) {
      obj.id = JSON.parse(data)[name].id;
      obj.name = JSON.parse(data)[name].name;
      obj.level = JSON.parse(data)[name].summonerLevel;
      obj.avatar = 'http://avatar.leagueoflegends.com/' + region + '/' + name + '.png';
      obj.region = req.body.region;
      obj.verified = false;
      obj.verifyKey = key;
      obj.verifyRoute = "https://" + obj.region + ".api.pvp.net/api/lol/" + obj.region + "/v1.4/summoner/" + obj.id + "/runes?api_key=" + config.lolapi;
      User.update({games: obj}, {where: {id: req.session.passport.user}})
      .then(function(){
        res.redirect('/#/settings');
      })
    })
  },

  verifySummoner: function(req, res){
    User.findById(req.session.passport.user)
    .then(function(data){
      var obj = data.games;
      relay(res, obj.verifyRoute, function(err, body){
        if(err) throw err;
        if(JSON.parse(body)[obj.id].pages[0].name === obj.verifyKey){
          obj.verified = true;
          obj.verifyKey = false;
          obj.verifyRoute = false;
          User.update({games: obj}, {where: {id: req.session.passport.user}})
          .then(function(){
            res.redirect('/#/profile');
          });
        } else {
          res.send("Verification failed. Check to see that the name of your first rune page is: " + obj.verifyKey);
        }
      })
    })
  },

  updateSummoner: function(req, res){ // Updates game data
    var user;
    User.findById(req.session.passport.user)
    .then(function(info){
      user = info.games;
      relay(res, 'https://' + user.region + '.api.pvp.net/api/lol/' + user.region + '/v1.4/summoner/' + user.id + '?api_key=' + config.lolapi, function(er, data) {
        user.name = JSON.parse(data)[user.id].name;
        user.level = JSON.parse(data)[user.id].summonerLevel;
        User.update({games: user}, {where: {id: req.session.passport.user}})
        .then(function(){
          res.redirect('/#/profile');
        })
      })
    })
  },

  updateRatings: function(req, res){ // Updates ratings data
    User.findById(req.session.passport.user)
    .then(function(data){
      User.update({
        ratings: req.body.ratings,
        counter: req.body.counter,
        answerHistory: req.body.answerHistory
      },{where: {id: req.session.passport.user}});
    });
  },

  // Functions that retrieve other user information - more sanitized results

  profileByName: function(req, res, name){
    User.findOne({where: {displayName: name}})
    .then(function(data){
      console.log('received: ' + data);
      var obj = data;
      obj.username = false;
      obj.hash = false;
      res.json(obj);
    })
  },

  profileById: function(req, res, id){
    User.findById(id)
    .then(function(data){
      var obj = data;
      obj.username = false;
      obj.hash = false;
      res.json(obj);
    })
  },

  // Functions that call to external APIs

  lolapi: function(req, res, region, username){
    var obj = {}
      //first api call
    relay('https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + username + '?api_key=' + config.lolapi, function(er, data) {
      obj.id = JSON.parse(data)[username].id;
      obj.name = JSON.parse(data)[username].name;
      obj.level = JSON.parse(data)[username].summonerLevel;
      obj.avatar = 'http://avatar.leagueoflegends.com/' + region + '/' + username + '.png';
      obj.region = region;
      //second api call
      request(res, 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.5/league/by-summoner/' + obj.id + '?api_key=' + config.lolapi, function(err, stat, body) {
        if(err) { throw err }
        else if(stat.statusCode === 404) {
          obj.rank = "unranked";
          res.json(obj);
        } else if(stat.statusCode < 200 || stat.statusCode >= 400) {
          console.log("Status Code: " + stat.statusCode);
        } else {
          obj.rank = JSON.parse(body)[obj.id][0].tier;
          res.json(obj);
        }
      });
    });
  }





};

function relay(res, url, callback) {
  request(url, function(err, stat, body) {
    if(err) {
      callback(err, null);
    } else if(stat.statusCode < 200 || stat.statusCode >= 400) {
      console.log("Status Code: " + stat.statusCode);
      res.send("It appears someone at Riot tripped over the power cord. Please try again soon =p");
    } else {
      callback(null, body);
    }
  });
}
