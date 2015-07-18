var React = require('react');
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Bio = require('./bio');
var BioForm = require('./bio-form');
var UserQuestions = require('./user-questions');
var Axios = require('axios');

var Profile = React.createClass({
  mixins: [Router.State],
  getInitialState: function() {
    return {
      bio: {},
      userquestions: [],
      username: '',
      displayName: ''
    };
  },
  init: function() {
    var context = this;
    Axios.get('/profile').
      then(function(response) {
        console.log('data:');
        console.log(response);
        context.setState({
          bio: response.data.bio,
          username: response.data.username,  
          displayName: response.data.displayName,
          ratings: response.data.ratings
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
    var username = this.getParams().username;
    return (
      <div className="row">  
        <div className="col-md-12">
          <Bio displayName={this.state.displayName} bio={this.state.bio}/>
        </div>
      </div>
    );
  }
});

module.exports = Profile;

//         <div className="col-md-12">
//            <UserQuestions username={username} questions={this.state.userquestions} profile={this.state.ratings} counter={this.state.counter} />
//         </div>
