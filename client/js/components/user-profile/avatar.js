var React = require('react');

var Avatar = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Picture</h1>
      </div>
    )
  }
});

module.exports = Avatar;

// {this.props.bio.avatar_url && <li className="list-group-item"><img src={this.props.bio.avatar_url}></li>}