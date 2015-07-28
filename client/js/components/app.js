var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('../components/header/app-header');

var App = React.createClass({

  getInitialState: function() {
    return {
      userId: 0,
      displayName: "",
      verified: false,
      verifyKey: "",
      avatar: "",
      profile: {
        times: {},
        purpose: {},
        roles: {},
        lanes: {},
        about: ""
      },
      teams: [],
      games: {},
      counter: 0,
      answerHistory: [],
      ratings: {},
      temp: {
        rank: "unranked",
        matches: []
      }
    };
  },

  componentDidMount: function() {
    var context = this;
    $.get('/profile', function(response){
      context.setState({
        userId: response.id,
        displayName: response.displayName,
        avatar: response.games.avatar,
        profile: response.profile,
        teams: response.teams,
        games: response.games,
        counter: response.counter,
        answerHistory: response.answerHistory,
        ratings: response.ratings,
        temp: response.temp
      });
    });
  },

  updateState: function(newState){
    this.setState(newState);
  },

  render: function() {
    return (
      <div className="app" id="application">
        <Header displayName={this.state.displayName} avatar={this.state.avatar} teams={this.state.teams} />
        <div className="container">
          <RouteHandler
          userId={this.state.userId}
          displayName={this.state.displayName}
          avatar={this.state.avatar}
          profile={this.state.profile}
          teams={this.state.teams}
          games={this.state.games}
          counter={this.state.counter}
          answerHistory={this.state.answerHistory}
          ratings={this.state.ratings}
          temp={this.state.temp}
          updateState={this.updateState}
          />
        </div>
      </div>
    );
  }
});

module.exports = App;
