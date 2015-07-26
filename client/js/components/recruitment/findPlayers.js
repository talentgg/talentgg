var React = require('react');
var axios = require('axios');

var _ = require('lodash');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;

var belle = require('belle');
Button = belle.Button;
Select = belle.Select;
Option = belle.Option;
Separator = belle.Separator;

var rd3 = require('react-d3');
var LineChart = rd3.LineChart;

var whiteBox = {backgroundColor: 'white', padding: '25', margin:'25', border: 'solid black 1px', height: '250', width: '700', display: 'inline-block'};
var headshot = {backgroundColor: 'white', padding: '10', height: '200', width: '200', float: 'left', textAlign: 'center'};
var stats = {backgroundColor: 'white', padding: '25', height: '200', width: '200', display: 'block', float: 'right', textAlign: 'center'};
var chart = {backgroundColor: 'white', padding: '25', height: '200', width: '200', display: 'block', float: 'right', textAlign: 'center'};

var FindPlayers = React.createClass({
  getInitialState: function() {
    return {
      users: [],
      teamIDs: [],
      myTeams: [],
      allTeams: [],
      filteredUsers: [],
      me: {},   
      displayName: "solo",   
      times: {
        "weekdays": false,
        "weeknights": false,
        "weekends": false
      },
      purpose: {
        "3x3 Casual": false,
        "5x5 Casual": false,
        "5x5 Ranked": false
      },
      lanes: {
          "top": false,
          "mid": false,
          "bot": false,
          "jungle": false
      },
      roles: {
        "assassin": false,
        "mage": false,
        "marksman": false,
        "bruiser": false,
        "support": false,
        "tank": false
      },
      id: 0,
      searchAs: "solo"
    };
  },
  componentWillMount: function() {
    var context = this;

    function getThem() {
      return axios.get('/user/all');
    }

    function getMe() {
      return axios.get('/profile');
    }

    function getMyTeams() {
      return axios.get('/profile/teams');
    }

    function getAllTeams() {
      return axios.get('/team/all');
    }

    axios.all([getThem(), getMe(), getMyTeams(), getAllTeams()])
        .then(axios.spread(function(them, me, myTeams, allTeams) {           
            context.setState({
              users: them.data,
              filteredUsers: them.data,
              me: me.data.ratings,
              id: me.data.id,
              myTeams: myTeams.data,
              displayName: me.data.displayName,
              allTeams: allTeams.data
            });
        }));
  },

  handleChange: function(e) {    
    this.setState({
      searchAs: e.value
    });
  },
  render: function() {
    var context = this;
    var teamsCaptained = (function() {
      var teamNodes = [];

      for (var i = 0; i < context.state.myTeams.length; i++) {
        if (context.state.myTeams[i].teamCaptain === context.state.id) {          
          teamNodes.push(
            <Option value={context.state.myTeams[i].profile.teamName}>{context.state.myTeams[i].profile.teamName}</Option>
          )
        }
      }
      return teamNodes
    })();

    return (     
      <div className="findPlayers">
      <link href='../test.css' rel='stylesheet' type='text/css' />
       
          <form onSubmit={this.handleSubmit}>

            <Select onUpdate={this.handleChange} >              
              <Option value="solo">search individuals as myself</Option>
              <Option value="team">search teams as myself</Option>              
              <Separator>Teams You Captain</Separator>
              {teamsCaptained}
            </Select>            
          
            <Checkbox
            label='Times: '
            options={this.state.times}
            onChange={this.setState.bind(this)}
            bootstrap />

            <Checkbox
            label='Roles: '
            options={this.state.purpose}
            onChange={this.setState.bind(this)}
            bootstrap />

            <Checkbox
            label='Roles: '
            options={this.state.roles}
            onChange={this.setState.bind(this)}
            bootstrap />

            <Checkbox
            label='Lanes: '
            options={this.state.lanes}
            onChange={this.setState.bind(this)}
            bootstrap />          

          </form>

        <MatchList users={this.state.users} teams={this.state.allTeams} me={this.state.me}
        id={this.state.id} searchAs={this.state.searchAs} times={this.state.times} purpose={this.state.purpose}
        roles={this.state.roles} lanes={this.state.lanes} />    
      </div>
      );
  }
});

module.exports = FindPlayers;

var MatchList = React.createClass({  

  render: function() {

    var checkIfChecked = function(obj) {
      return !(_.every(obj, function(elm) {
        return elm === false;
      }) || _.every(obj, function(elm) {
        return elm === true;
      }));
    };

    var filterByProperty = function(userList, property, context) {
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
    }
    
    var userSubset = this.props.users;
    userSubset = checkIfChecked(this.props.times) ? filterByProperty(userSubset, "times", this) : userSubset;
    userSubset = checkIfChecked(this.props.purpose) ? filterByProperty(userSubset, "purpose", this) : userSubset;
    userSubset = checkIfChecked(this.props.roles) ? filterByProperty(userSubset, "roles", this) : userSubset;
    userSubset = checkIfChecked(this.props.lanes) ? filterByProperty(userSubset, "lanes", this) : userSubset;

    var context = this;
    var arrayToString = function(obj) {
      var string = [];
      for (var key in obj) {
        if (obj[key] === true) {
          string.push(key);
        }
      }
      return string.toString();
    };

    var calculateMatchScore = function(pos, n) {
        var z, phat;
        z = 1.56; // 1.96 = 95%
        phat = 1 * pos / n;
      return (phat + z*z/(2*n) - z * Math.sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n); 
    };
    var MatchNodes = [];
    var matchOrder = [];
    var overallScore;
    var matchData;

    console.log(this.props.teams);
    matchData = this.props.searchAs === "solo" ? userSubset : this.props.teams;
    console.log(matchData);

    // do the same for myratings if they pick a team

    for (var i = 0; i < matchData.length; i++){
      overallScore = 0;
      if (matchData[i].id !== this.props.id) {
        for (key in this.props.me) {          
          var score = 20 - Math.abs(this.props.me[key] - matchData[i].ratings[key]);
          overallScore += score;
          score = calculateMatchScore(score, 20);        
        }
        overallScore = Math.round(calculateMatchScore(overallScore, 200) * 100);
        matchData[i].overallScore = overallScore;        
        matchOrder.push(matchData[i]);
      }
    }

    _.map(matchOrder, function(match) {
      match.link = '/#/user/' + match.displayName
      if (!match.games) {        
        match.games = {
          avatar: "http://sener.is/hat.jpg"
        }
        match.bio = match.profile
        match.displayName = match.profile.teamName
        match.link = '/#/team/' + match.displayName
      }

      if (isNaN(match.overallScore)) {
        console.log("NaN error")
        console.log(match);
        match.overallScore = 0;
        }
      });
      matchOrder = _.sortBy(matchOrder, function(match) {
        return match.overallScore;
      }).reverse();
      _.map(matchOrder, function(match) {
      var lineData = [{
        name: "me",
        values: []
      }, {
        name: "them",
        values: []
      }];
      var counter = 0;
      for (var key in context.props.me) {
        lineData[0].values.push({
          x: counter,
          y: Number(context.props.me[key])
        });
        lineData[1].values.push({
          x: counter,
          y: Number(match.ratings[key])
        });
        counter++;
      }
      MatchNodes.push(
        <div className="row" style={whiteBox}>
            <div className="row" style={headshot}>
              <img className="img-circle center-block" src={match.games.avatar}/>
              <a href={match.link}> <div align="center"> { match.displayName } </div> </a>              
              <div> {match.overallScore}% </div>
            </div>
            <div className="row" style={stats}>
              <div> { arrayToString(match.bio.purpose) } </div>    
              <div> { arrayToString(match.bio.times) } </div>
              <div> { arrayToString(match.bio.roles) } </div>
              <div> { arrayToString(match.bio.lanes) } </div>              
              <br />
              <br />
            </div>
            <div className="row">
              <LineChart className="row" style={chart}
                legend={false}
                data={lineData}
                width={250}
                height={200}
                title=""/>
            </div>
        </div>
      )
    });

    return (
      <div>
        <ul className="MatchList">
          {MatchNodes}
        </ul>          
      </div>
    );
  }
});
