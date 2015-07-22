var React = require('react');
var axios = require('axios');

var _ = require('lodash');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;

var belle = require('belle');
Button = belle.Button;

var whiteBox = {backgroundColor: 'white', padding: '25', margin:'25', border: 'solid black 2px', height: '250', width: '450', display: 'inline-block'};
var headshot = {backgroundColor: 'white', padding: '10', border: 'solid red 2px', height: '200', width: '200', float: 'left', textAlign: 'center'};
var stats = {backgroundColor: 'white', padding: '25', border: 'solid blue 2px', height: '200', width: '200', display: 'block', float: 'right', textAlign: 'center'};


var FindTeams = React.createClass({
  getInitialState: function() {
    return {
      users: [],
      filteredUsers: [],
      me: {},      
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
      willdo: {
        'Tank': false,
        'Jungle': false,
        'Support': false,
        'Mid': false,
        'ADC': false,
        'Fill': false
      },
      id: 0
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

    axios.all([getThem(), getMe()])
        .then(axios.spread(function(them, me) { 
            context.setState({
              users: them.data,
              filteredUsers: them.data,
              me: me.data.ratings,
              id: me.data.id             
            });
        }));
  },

  handleSubmit: function() {

    var checkIfChecked = function(obj) {            
      return !(_.every(obj, function(elm) {
        return elm === false;
      }) || _.every(obj, function(elm) {
        return elm === true;
      }));      
    };

    var userSubset = this.state.users;

    if (checkIfChecked(this.state.times) === true) {
      console.log("filtering by times")
      console.log(this.state.times)
      var filteredTimes = [];
      for (key in this.state.times) {
        if (this.state.times[key] === true) filteredTimes.push(key);
      }      
      userSubset = _.filter(userSubset, function(user) {
        var filterTest = false;        
        _.map(filteredTimes, function(time){ 
          if (user.bio.times[time] === true) {
            filterTest = true;
          }
        })
        return filterTest;
      });      
    }

    if (checkIfChecked(this.state.purpose) === true) {
      console.log("filtering by purpose")
      var filteredPurpose = [];
      for (key in this.state.purpose) {
        if (this.state.purpose[key] === true) filteredPurpose.push(key);
      }      
      userSubset = _.filter(userSubset, function(user) {
        var filterTest = false;        
        _.map(filteredPurpose, function(time){ 
          if (user.bio.purpose[time] === true) {
            filterTest = true;
          }
        })
        return filterTest;
      });      
    }

    if (checkIfChecked(this.state.willdo) === true) {
      console.log("filtering by willdo")
      var filteredWillDo = [];
      for (key in this.state.willdo) {
        if (this.state.willdo[key] === true) filteredWillDo.push(key);
      }      
      userSubset = _.filter(userSubset, function(user) {
        var filterTest = false;        
        _.map(filteredWillDo, function(time){ 
          if (user.bio.willdo[time] === true) {
            filterTest = true;
          }
        })
        return filterTest;
      });      
    }
    console.log("after");
    console.log(userSubset);

    this.setState({
      filteredUsers: userSubset
    });
  },
  render: function() {

    return (     
      <div className="findTeam">
        <h1> Matches </h1>
        <h2> Filters </h2>
       
          <form onSubmit={this.handleSubmit}>
          
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
            label='Open Positions: '
            options={this.state.willdo}
            onChange={this.setState.bind(this)}
            bootstrap />
            
            <Button primary type="submit" value="Submit">Submit</Button>

          </form>

          


        <MatchList users={this.state.filteredUsers} me={this.state.me} id={this.state.id} />    
      </div>
      );
  }
});

module.exports = FindTeams

var MatchList = React.createClass({  

  render: function() {
    console.log("xxxxxxxxx")
    console.log(this.props.users)
    console.log("xxxxxxxxx")

    var arrayToString = function(obj) {
      var string = [];
      for (var key in obj) {
        if (obj[key] === true) {
          string.push(key);
        }
      }
      return string.toString();
    };

    var calculateMatchScore =  function(pos, n) {
      var z, phat;      
      z = 1.96;
      phat = 1 * pos / n;
      return (phat + z*z/(2*n) - z * Math.sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n); 
    };
    var MatchNodes = [];
    var overallScore;
    
    for (var i = 0; i < this.props.users.length; i++){
      if (this.props.users[i].id !== this.props.id) {
        overallScore = 0;
        for (key in this.props.me) {          
          var score = 20 - Math.abs(this.props.me[key] - this.props.users[i].ratings[key]);
          overallScore += score;
          score = calculateMatchScore(score, 20);        
        };
        overallScore = Math.round(calculateMatchScore(overallScore, 200) * 100);
        this.props.users[i].overallScore = overallScore;
        MatchNodes.push(
          <div className="row" style={whiteBox}>
            <div className="row" style={headshot}>
              <img className="img-circle center-block" src={this.props.users[i].games.avatar}/>
              <div align="center"> { this.props.users[i].displayName } </div>
              <div> {overallScore}% </div>
            </div>
            <div className="row" style={stats}>
              <div> does this work? </div>
              <div> { arrayToString(this.props.users[i].bio.willdo) } </div>
              <div> { arrayToString(this.props.users[i].bio.purpose) } </div>    
              <div> { arrayToString(this.props.users[i].bio.times) } </div>
              <br />
              <br />
            </div>
          </div>
        )
      }
    }
    MatchNodes = _.sortBy(MatchNodes, function(user) {
      return user.overallScore;
    })

    return (
      <div>
        <ul className="MatchList">
          {MatchNodes}
        </ul>          
      </div>
    );
  }
});

