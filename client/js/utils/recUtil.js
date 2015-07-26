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

  checkIfChecked: function(obj) {
    return !(_.every(obj, function(elm) {
      return elm === false;
    }) || _.every(obj, function(elm) {
      return elm === true;
    }));
  },

  filterByProperty: function(userList, property, context) {
    var filters = [];

    for (var key in context.props[property]) {
      if (context.props[property][key] === true) filters.push(key);
    }
    return _.filter(userList, function(user) {
      var filterTest = false;
      _.map(filters, function(elm) {
        if (user.bio[property][elm] === true) {
          filterTest = true;
        }
      });
      return filterTest;
    });
  },

   teamsCaptained: (function(teams, id) {
    var teamNodes = [];
    _.map(teams, function(myTeam) {
        if (myTeam.captain === id) {
          teamNodes.push(
            <Option value={myTeam[i].profile.teamName}>{myTeam[i].profile.teamName}</Option>
          )
        }
      })
            
    return teamNodes
  })

};

module.exports = RecUtil;
