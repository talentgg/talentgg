var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');

var TeamMembers = React.createClass({
  mixins: [Router.state, Router.Navigation],
  propTypes: {
    team: React.PropTypes.obj.isRequired
  },
  getInitialState: function() {
    return {
      team: this.props.team
    };
  },
  render : function() {
    return (
      
    )
  }
});

module.exports = TeamMembers;