var React = require('react');
var Router = require('react-router');
var Axios = require('axios');
var _ = require('lodash');

var RecUtil = require('../../utils/recUtil.js');

var TeamMembers = React.createClass({
  render : function() {

    var membersList = [];
      
    for (var i = 0; i < this.props.members.length; i++) {
      var context = this;
      var currentMembers = context.props.members;
      var addLanes = RecUtil.arrayToString(currentMembers[i].lanes);
      var addRoles = RecUtil.arrayToString(currentMembers[i].roles);
      console.log('lookie here');
      console.log(addLanes);
      console.log(addRoles);

      membersList.push(
        <div className="col-sm-8" id="whitebox">
          <p><b>Name</b>: {currentMembers[i].name}</p>
          <p><b>Lane</b>: {addLanes}</p>
          <p><b>Role</b>: {addRoles}</p>
        </div>
      )  
    };   

    console.log(membersList);

    return (
      <div className="membersList">
        {membersList}
      </div>
    )
  }
});

module.exports = TeamMembers;
