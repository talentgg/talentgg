var User = require( '../models/user.model' );
var passport = require( 'passport' );
var bcrypt = require('bcryptjs');
var request = require('request');
var config = require('../config/config');

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

  updateRatings: function(req, res){    
    User.findById(req.session.passport.user)
    .then(function(data){      
      User.update({
        ratings: req.body.ratings,
        counter: req.body.counter,
        answerHistory: req.body.answerHistory
      },{where: {id: req.session.passport.user}});
    });
  },

  updateSettings: function(req, res){
    console.log(req.body);
    User.findById(req.session.passport.user)
    .then(function(data){
      User.update({displayName: req.body.displayName}, {where: {id: req.session.passport.user}});
      res.redirect('/#/user-profile');
    })
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
      obj.avatar = 'avatar.leagueoflegends.com/' + region + '/' + username + '.png';
      //second api call
      request('https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.5/league/by-summoner/' + obj.id + '?api_key=' + config.lolapi, function(err, stat, body) {
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

function relay(url, callback) {
  request(url, function(err, stat, body) {
    if(err) {
      callback(err, null);
    } else if(stat.statusCode < 200 || stat.statusCode >= 400) {
      console.log("Status Code: " + stat.statusCode);
    } else {
      callback(null, body);
    }
  });
}
