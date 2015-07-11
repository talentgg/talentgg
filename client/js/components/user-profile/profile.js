var React = require('react');
var Avatar = require('./avatar');
var BasicInfo = require('./basic-info');
var Footer = require('./footer');
var UserQuestions = require('./user-questions');

var Profile = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() { //html must be wrapped in one big tag (div, form, etc.)
    return (
      <div>  
        <div>
          <Avatar username={username} avatar={this.state.avatar}/>
        </div>
        <div>
          <BasicInfo username={username} info={this.state.basic-info}/>
        </div>
        <div>
          <UserQuestions username={username} questions={this.state.user-questions}/>
        </div>
        <div>
          <Footer username={username} footer={this.state.footer}/>
        </div>
      </div>
    );
  }
});

module.exports = Profile;