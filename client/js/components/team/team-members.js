var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');

var available = arrayToString(this.state.profile.times);
    var memberNames = [];
    _.map(this.state.members, function(member) {
      memberNames.push(
        <a href={'/#/user/id/' + member.id}><div align="center">{member.name}</div></a>
      )
    });

var TeamMembers = React.createClass({
  mixins: [Router.state, Router.Navigation],
  getInitialState: function() {
    return {
      team: {},
      bio: {}
    };
  },
  componentDidMount: function() {
    var router = this.context.router;

  },
  render : function() {

    var members = this.props.members;
    members.forEach(function(member) {
      
    })

    return (
      <div className="col-sm-4">
        <div className="whitebox">
          <image className="image-rounded image-responsive" width="128px" height="128px" img src={this.props.avatar} />
          <p><b>Name</b>: {this.props.displayName}</p>
          <p><b>Lane</b>: {this.props.lane} </p>
          <p><b>Role</b>: {this.props.role} </p>
        </div>
      </div>
    )
  }
});

module.exports = TeamMembers;
