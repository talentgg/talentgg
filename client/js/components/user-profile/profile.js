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
    };
  },
  init: function() {
    //this.setState()
    var context = this;
    Axios.get('/profile').
      then(function(response) {
        context.setState({
          bio: response.data.bio     
        });
      });  
  },
  componentWillMount: function() {
    this.router = this.context.router;
  },
  componentDidMount: function() {
    this.init();
  },
  componentWillUnmount: function() {
    
  },
  handleEditProfile: function(form) {
    // form fields update bio on submit, can also do html form post to db than get without cache
    this.ref.child(this.getParams().username).set(this.state.bio.concat([form]));
  },
  render: function() {
    var username = this.getParams().username;
    return (
      <div className="row">  
        <div className="col-md-12">
          <Bio username={username} bio={this.state.bio}/>
        </div>
        <div className="col-md-12">
          <UserQuestions username={username} questions={this.state.userquestions}/>
        </div>
      </div>
    );
  }
});

module.exports = Profile;