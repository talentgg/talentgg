var request = require('request');
var api = require('../config/config').api;

//This function checks to see if the user is logged in and, if not, returns them to the index page
exports.isAuth = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

//Helper function for dealing with API calls
var relay = function(url, callback) {
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

//This function extracts the necessary league information from the provided summoner name
exports.userInfo = function(username, region, callback) {
  var obj = {}
    //first api call
  relay('https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + username + '?api_key=' + api, function(er, data) {
    obj.id = JSON.parse(data)[username].id;
    obj.name = JSON.parse(data)[username].name;
    obj.level = JSON.parse(data)[username].summonerLevel;
    obj.icon = JSON.parse(data)[username].profileIconId;
    console.log(obj);
    //second api call
    relay('https://' + region + '.api.pvp.net/api/lol/na/v2.5/league/by-summoner/' + obj.id + '?api_key=' + api, function(er, stats) {
      console.log(stats);
      obj.rank = JSON.parse(stats)[obj.id][0].tier;
      //invoke callback on obj
      callback(obj);
    });
  });
}
