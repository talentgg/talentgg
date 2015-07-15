var React = require('react');
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Avatar = require('./avatar');
var Bio = require('./bio');
var BioForm = require('./bio-form');
var Footer = require('./footer');
var UserQuestions = require('./user-questions');

var Profile = React.createClass({

  mixins: [Router.State],

  getInitialState: function() {
    return {
      avatar: {},
      bio: [],
      userquestions: [],
      footer: {}
    };
  },

  componentDidMount: function() {
    // api get bio/user questions
  },

  componentWillUnmount: function() {
    this.unbind('bio');
  },

  handleEditProfile: function(form) {
    // form fields update bio on submit, can also do html form post to db than get without cache
    this.ref.child(this.getParams().username).set(this.state.bio.concat([form]));
  },

  render: function() {
    var username = this.getParams().username;
    return (
      <div className="row">  
        <div className="col-md-2">
          <Avatar username={username} avatar={this.state.avatar}/>
        </div>
        <div className="col-md-10">
          <Bio username={username} bio={this.state.bio}/>
        </div>
        <div className="col-md-12">
          <UserQuestions username={username} questions={this.state.userquestions}/>
        </div>
        <div className="col-md-12">
          <Footer username={username} footer={this.state.footer}/>
        </div>
      </div>
    );
  }
});

module.exports = Profile;