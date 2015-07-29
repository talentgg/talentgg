var React = require('react');
var _ = require('lodash');

var RecUtil = {

  arrayToString: function(obj) {
    var string = [];
    for (var key in obj) {
      if (obj[key] === true) {
        string.push(key);
      }
    }
    return string.toString();
  },

  calculateMatchScore: function(pos, n) {
    var z, phat;
    z = 1.56; // 1.96 = 95%
    phat = 1 * pos / n;
    return (phat + z * z / (2 * n) - z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) / (1 + z * z / n);
  },

  calculateTeamMatch: function(user, team) {
        console.log(user.counter);

        var target = {
          collaborative: team[collaborative], 
          boundaries: team[boundaries],
          loud: team[loud],
          committed: team[committed],
          ambition: team[ambition],

          aggressive: team[aggressive],
          dominance: (Math.abs(team[aggressive]) * - 1),
          // adaptable: //+ makes it nonfactor. -, check. make this a message, //<-- not too much total rigidness
          blunt: team[blunt]// check for tiers,     //<-- not too much total?
          // brute: // message,
        };

      

  },

  checkIfChecked: function(obj) {
    return !(_.every(obj, function(elm) {
      return elm === false;
    }) || _.every(obj, function(elm) {
      return elm === true;
    }));
  },

  propFilter: function(userList, property, context) {
    var filters = [];

    for (var key in context.props[property]) {
      if (context.props[property][key] === true) filters.push(key);
    }
    return _.filter(userList, function(user) {
      var filterTest = false;
      _.map(filters, function(elm) {
        if (user.profile[property][elm] === true) {
          filterTest = true;
        }
      });
      return filterTest;
    });
  },

  teamsCaptained: function(teams, id) {
    var teamNodes = [];
    _.map(teams, function(myTeam) {
      if (myTeam.teamCaptain === id) {
        teamNodes.push(<Option value={myTeam.profile.teamName}> {myTeam.profile.teamName}</Option>)
      }
    })
    return teamNodes
  },

  whiteBox: {
    backgroundColor: 'white',
    padding: '25',
    margin: '25',
    border: 'solid black 1px',
    height: '250',
    width: '700',
    display: 'inline-block'
  },
  headshot: {
    backgroundColor: 'white',
    padding: '10',
    height: '200',
    width: '200',
    float: 'left',
    textAlign: 'center'
  },
  stats: {
    backgroundColor: 'white',
    padding: '25',
    height: '200',
    width: '200',
    display: 'block',
    float: 'right',
    textAlign: 'center'
  },
  chart: {
    backgroundColor: 'white',
    padding: '25',
    height: '200',
    width: '200',
    display: 'block',
    float: 'right',
    textAlign: 'center'
  }


};

module.exports = RecUtil;
