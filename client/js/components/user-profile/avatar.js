var React = require('react');

var avatar = React.createClass({
  render: function() {
    return: (
      <div>
        {this.props.avatar_url && <img src={this.props.avatar_url}}
      </div>
    )
  }
});

module.exports = Avatar;