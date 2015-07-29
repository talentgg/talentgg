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

var RecUtil = require('../../utils/recUtil.js');


var FindPlayers = React.createClass({
  getInitialState: function() {
    return {
      allUsers: [],
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
        "Casual": false,
        "Ranked": false,
        "3v3": false,
        "5v5": false
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

    axios.all([axios.get('/user/all'), axios.get('/profile'), axios.get('/profile/teams'), axios.get('/team/all')])
        .then(axios.spread(function(them, me, myTeams, allTeams) {
            context.setState({
              allUsers: them.data,
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
    var teamsCaptained = RecUtil.teamsCaptained(context.state.myTeams, context.state.id);

    return (
      <div className="findPlayers">

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
            label='Purpose: '
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

        <MatchList allUsers={this.state.allUsers} allTeams={this.state.allTeams} me={this.state.me}
        id={this.state.id} searchAs={this.state.searchAs} times={this.state.times} purpose={this.state.purpose}
        roles={this.state.roles} lanes={this.state.lanes} />
      </div>
      );
  }
});

module.exports = FindPlayers;

var MatchList = React.createClass({

  render: function() {
    var context = this;
    var userSubset
    var teamSubset;

    if (this.props.searchAs !== "team") {
      //console.log("solo")
      userSubset = context.props.allUsers;
      userSubset = RecUtil.checkIfChecked(context.props.times) ? RecUtil.propFilter(userSubset, "times", context) : userSubset;
      userSubset = RecUtil.checkIfChecked(context.props.purpose) ? RecUtil.propFilter(userSubset, "purpose", context) : userSubset;
      userSubset = RecUtil.checkIfChecked(context.props.roles) ? RecUtil.propFilter(userSubset, "roles", context) : userSubset;
      userSubset = RecUtil.checkIfChecked(context.props.lanes) ? RecUtil.propFilter(userSubset, "lanes", context) : userSubset;
    } else {
      //console.log("team")
      teamSubset = context.props.allTeams;
      //console.log(teamSubset);
      //console.log(teamSubset[0])
      teamSubset = RecUtil.checkIfChecked(context.props.times) ? RecUtil.propFilter(teamSubset, "times", context) : teamSubset;
      teamSubset = RecUtil.checkIfChecked(context.props.purpose) ? RecUtil.propFilter(teamSubset, "purpose", context) : teamSubset;
      _.map(teamSubset, function(team) {
        team.roles = {
          "assassin": false,
          "mage": false,
          "marksman": false,
          "bruiser": false,
          "support": false,
          "tank": false
        },
        team.lanes = {
          "top": false,
          "mid": false,
          "bot": false,
          "jungle": false
        },
        _.map(team.ads, function(ad) {
          for (key in ad.roles) {
            team.roles[key] = true;
          }
          for (key in ad.lanes) {
            team.lanes[key] = true;
          }
        })
      })
    }

    //console.log(teamSubset);


    var MatchNodes = [];
    var matchOrder = [];
    var overallScore;
    var matchData;

    matchData = this.props.searchAs === "solo" ? userSubset : teamSubset;
    //console.log('matchData')
    //console.log(matchData);
    // do the same for myratings if they pick a team

    _.map(matchData, function(data) {
      overallScore = 0;
      if (data.id !== context.props.id) {
        // for (key in context.props.me) {
        //   var score = 20 - Math.abs(context.props.me[key] - data.ratings[key]);
        //   overallScore += score;
        //   score = RecUtil.calculateMatchScore(score, 20);
        // }
        overallScore = 50; //Math.round(RecUtil.calculateMatchScore(overallScore, 200) * 100);
        data.overallScore = overallScore;
        matchOrder.push(data);
      }
    });

    _.map(matchOrder, function(match, i) {
      match.link = '/#/user/' + match.displayName
      if (!match.games) {
        match.games = {
          avatar: "http://sener.is/hat.jpg"
        }
        match.profile = match.profile
        match.displayName = match.profile.teamName
        match.link = '/#/team/' + match.displayName
      }

      if (isNaN(match.overallScore)) {
        //console.log("NaN error") //keep these
        //console.log(match);
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
<<<<<<< HEAD
        <div className="row" style={RecUtil.whiteBox}>
            <div className="row" style={RecUtil.headshot}>
              <img className="img-circle center-block" src={match.games.avatar}/>
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
              <LineChart className="row" style={RecUtil.chart}
                legend={false}
                data={lineData}
                width={250}
                height={200}
                title=""/>
=======
<<<<<<< HEAD
        <div className="col-sm-3">
=======
        <div className="col-sm-3" key={i}>
>>>>>>> fixed charts
          <div className="panel panel-default whitebox">
            <div className="panel-body">
              <a href={match.link}>
                <div className="row">
                  <img className="img-circle center-block img-fit" src={match.games.avatar}/>
                </div>
                <div className="row">
                  <h4 className="text-center">{match.displayName}</h4>
                </div>
              </a>
              <div className="row">
                <h3 className="text-center" style={{color: 'green'}}>{match.overallScore}%</h3>
              </div>
>>>>>>> 13cf05a7dbe14474974ff66c388135cfaad725dc
            </div>
          </div>
        </div>
      )
      /*
      <div className="row" style={RecUtil.headshot}>
        <div>

        </div>
      </div>
      <div className="row" style={RecUtil.stats}>
        <div> { RecUtil.arrayToString(match.bio.purpose) } </div>
        <div> { RecUtil.arrayToString(match.bio.times) } </div>
        <div> { RecUtil.arrayToString(match.bio.roles) } </div>
        <div> { RecUtil.arrayToString(match.bio.lanes) } </div>
        <br />
        <br />
      </div>
      <div className="row">
        <LineChart className="row" style={RecUtil.chart}
          legend={false}
          data={lineData}
          width={250}
          height={200}
          title=""
        />
      </div>
      */
    });

    return (
      <div>
        <ul className="MatchList row">
          {MatchNodes}
        </ul>
      </div>
    );
  }
});
