var React = require('react');

var BasicInfo = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    clan: React.PropTypes.string,
    rank: React.PropTypes.string
  },
  render: function() {
    return (
      <div>
        <h2>User info:</h2>
        <p>Username: {this.props.username}</p>
        <p>clan: {this.props.clan}</p>
        <p>rank: {this.props.rank}</p>
      </div>
    );
  }
});

module.exports = BasicInfo;