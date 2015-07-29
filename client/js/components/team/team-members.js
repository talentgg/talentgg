var React = require('react');
var Router = require('react-router');
var Axios = require('axios');
var _ = require('lodash');

var RecUtil = require('../../utils/recUtil.js');

var TeamMembers = React.createClass({
  render : function() {

    var membersList = [];
      
    for (var i = 0; i < this.props.members.length; i++) {
      var adLanes = RecUtil.arrayToString(this.props.members[i]["lanes"])
      var adRoles = RecUtil.arrayToString(this.props.ads[i]["roles"])
      console.log('---------->');
      console.log(adLanes);
      console.log(adRoles);
      var context = this;
      var members = context.props.members;

      membersList.push(
        <div className="col-sm-4" id="whitebox">
          <p><b>Name</b>: {members[i].name}</p>
          <p><b>Lane</b>: {members[i]["lanes"]}</p>
          <p><b>Role</b>: {adRoles}</p>
        </div>
      )  
    };   

    console.log(membersList);

    return (
      <div className="row">
        {membersList}
      </div>
    )
  }
});

module.exports = TeamMembers;
