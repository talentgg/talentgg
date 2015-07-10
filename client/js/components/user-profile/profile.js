var React = require('react');
var Avatar = require('/avatar');
var BasicInfo = require('/basic-info');
var Footer = require('/footer');
var UserQuestions = require('/user-questions');

var Profile = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return: (
      <Avatar />
      <BasicInfo />
      <UserQuestions />
      <Footer />
    );
  }
});

module.exports = Profile;