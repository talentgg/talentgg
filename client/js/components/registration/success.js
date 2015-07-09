var React = require('react');

var Success = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Done!</h2>
        <h4>Please check your email for a confirmation link to activate your account.</h4>
      </div>
    );
  }
});

module.exports = Success;