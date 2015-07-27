var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');
var _ = require('lodash');
var RecUtil = require('../../utils/recUtil.js');

var TeamMembers = React.createClass({
  propTypes: {
    members: React.PropTypes.array.isRequired,
  },
  render : function() {
    var members = this.props.members;
    var membersList = [];

    for (var i = 0; i < members.length; i++) {
      for (var key in obj) {
      membersList.push(
        <div>
          <p><b>Name</b>: {this.props.name}</p>
        </div>
      )     
    }
    }

    _.map(this.props.membersList, function(member, index) {
      return <div className="col-sm-4 whitebox" key={index}>
                {member}      
              </div>     
            });

    return (
      <div className="row">
        {membersList}
      </div>
    )
  }
});

module.exports = TeamMembers;

          // <img className="img-rounded img-responsive" src={this.props.games.avatar} />
          // <p><b>Role</b>: {this.props.role}</p>
          // <p><b>Lane</b>: {this.props.lane}</p>
