var React = require('react');
var _ = require('lodash');
var RecUtil = require('../../utils/recUtil.js');

var rd3 = require('react-d3');
var LineChart = rd3.LineChart;

var MatchList = React.createClass({

  render: function() {

    var context = this;
    var userSubset;
    var teamSubset;
    var key;

    

    if (this.props.searchAs !== "team") {
      console.log("solo");
      userSubset = _.filter(context.props.allUsers, function(user) {   // remove self from pool
        return user.id !== context.props.id;
      }); // apply filters
      userSubset = RecUtil.checkIfChecked(context.props.times) ? RecUtil.propFilter(userSubset, "times", context) : userSubset;
      userSubset = RecUtil.checkIfChecked(context.props.purpose) ? RecUtil.propFilter(userSubset, "purpose", context) : userSubset;
      userSubset = RecUtil.checkIfChecked(context.props.roles) ? RecUtil.propFilter(userSubset, "roles", context) : userSubset;
      userSubset = RecUtil.checkIfChecked(context.props.lanes) ? RecUtil.propFilter(userSubset, "lanes", context) : userSubset;
    } else {
      console.log("team");
      teamSubset = context.props.allTeams;
      teamSubset = RecUtil.checkIfChecked(context.props.times) ? RecUtil.propFilter(teamSubset, "times", context) : teamSubset;
      teamSubset = RecUtil.checkIfChecked(context.props.purpose) ? RecUtil.propFilter(teamSubset, "purpose", context) : teamSubset;
      _.remove(teamSubset, function(team) { // removes teams that you're already on
        return _.some(team.members, function(member) {
          return member.id === context.props.id;
        });
      });
      _.map(teamSubset, function(team) { // for team search, filters depend on which ads run
        team.roles = {
          "assassin": false,
          "mage": false,
          "marksman": false,
          "bruiser": false,
          "support": false,
          "tank": false
        };
        team.lanes = {
          "top": false,
          "mid": false,
          "bot": false,
          "jungle": false
        };
        _.map(team.ads, function(ad) {
          for (key in ad.roles) {
            team.roles[key] = true;
          }
          for (key in ad.lanes) {
            team.lanes[key] = true;
          }
        });

        // team matching logic. create a target profile. first, extract the ratings of all the members from the "allUser" pool.
        var memberRatings = _.filter(context.props.allUsers, function(user) {
          return _.some(team.members, function(id) {
            return (id.id === user.id);
          });
        });
        // console.log(memberRatings);
        // console.log("member // team")
        // console.log(team.ratings);
        // console.log(typeof team.ratings.dominance)

        _.each(memberRatings, function(member) {
          _.each(member.ratings, function(rating, key) {
            team.ratings[key] += Number(rating);
          });
        });
        _.each(team.ratings, function(rating) {
          rating /= memberRatings.length;
        });
        // console.log("target");
        // console.log(team.ratings);
      });
    }

    var MatchNodes = [];
    var matchOrder = [];
    var overallScore;
    var matchData = this.props.searchAs === "solo" ? userSubset : teamSubset;
    console.log(this.props.searchAs);
    // do the same for myratings if they pick a team

    _.each(matchData, function(data) {
      console.log("DATA")
      console.log(data);
      overallScore = 0;
      for (key in context.props.me) {  
        var score = 100 - Math.abs(Number(context.props.me[key]) - Number(data.ratings[key]));
        console.log("SCORE", score);
        console.log("team", data.ratings[key], typeof data.ratings[key])
        console.log("me", context.props.me[key], typeof context.props.me[key])
        data.ratings[key] = RecUtil.calculateMatchScore(score, 100);
        console.log(key, ":", data.ratings[key]);        
        overallScore += data.ratings[key];        
      }
      overallScore *= 10;
      data.overallScore = Math.round(RecUtil.calculateMatchScore(overallScore, 100) * 100);;
      matchOrder.push(data);
    });

    _.each(matchOrder, function(match) {
      match.link = context.props.searchAs === 'solo' ? '/#/user/' + match.displayName : '/#/team/' + match.profile.teamName;      
        if (!match.games) {        
          match.games = {
            avatar: "http://sener.is/hat.jpg"
          };
          match.profile = match.profile;
        // var name = context.props.searchAs === 'solo' ? match.displayName : match.profile.teamName;
          match.displayName = match.profile.teamName;
          match.link = '/#/team/' + match.displayName;
        }
      if (isNaN(match.overallScore)) {
        console.log("NaN error"); // if there's an error with the matching logic, log it and set to zero
        console.log(match);
        match.overallScore = 0;
      }
      match.lineData = [{
        name: "me",
        values: []
      }, {
        name: "them",
        values: []
      }];

      match.counter = 0; // x axis

      for (var key in context.props.me) {
        match.lineData[0].values.push({
          x: match.counter,
          y: Number(context.props.me[key])
        });
        match.lineData[1].values.push({
          x: match.counter,
          y: Number(match.ratings[key])
        });
        match.counter++;
      }
    });

    matchOrder = _.sortBy(matchOrder, function(match) {
      return match.overallScore;
    }).reverse();

    console.log("matchOrder");
    console.log(matchOrder);

    var MatchNodes = _.map(matchOrder, function(match) {
      return (<div className="row" style={RecUtil.whiteBox}>
          <div className="row" style={RecUtil.headshot}>
            <img className="img-circle center-block img-fit" src={match.games.avatar}/>
            <a href={match.link}> <div align="center"> { match.displayName } </div> </a>              
            <div> {match.overallScore}% </div>
          </div>
          <div className="row" style={RecUtil.stats}>
            <div> { RecUtil.arrayToString(match.profile.purpose) } </div>    
            <div> { RecUtil.arrayToString(match.profile.times) } </div>
            <div> { RecUtil.arrayToString(match.profile.roles) } </div>
            <div> { RecUtil.arrayToString(match.profile.lanes) } </div>              
            <br />
            <br />
          </div>
          <div className="row">
            
          </div>
        </div>
      )
    });
    // <LineChart className="row" style={RecUtil.chart}
    //           legend={false}
    //           data={match.lineData}
    //           width={250}
    //           height={200}
    //           title=""
    //         />
      console.log("matchNodes.length")
      console.log(MatchNodes.length)

    return (
      <div>
        <ul className="MatchList">
          {MatchNodes}
        </ul>          
      </div>
    );
  }
});

module.exports = MatchList;
