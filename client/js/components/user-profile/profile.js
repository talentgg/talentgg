var React = require('react');
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Bio = require('./bio');
var BioForm = require('./bio-form');
var Axios = require('axios');

var Profile = React.createClass({
  mixins: [Router.State],
  getInitialState: function() {
    return {
      bio: {},
      userquestions: [],
      displayName: '',
      games: {}
    };
  },
  init: function() {
    var context = this;
    Axios.get('/profile').
      then(function(response) {
        context.setState({
          bio: response.data.bio,
          displayName: response.data.displayName,
          ratings: response.data.ratings,
          games: response.data.games
        });
      });
  },
  componentWillMount: function() {
    this.router = this.context.router;
  },
  componentDidMount: function() {
    this.init();
  },
  render: function() {
    return (
      <Bio displayName={this.state.displayName} bio={this.state.bio} games={this.state.games}/>
    );
  }
});

module.exports = Profile;

//         <div className="col-md-12">
//            <UserQuestions username={username} questions={this.state.userquestions} profile={this.state.ratings} counter={this.state.counter} />
//         </div>
