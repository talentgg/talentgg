var React = require('react');
var Router = require('react-router');
var Axios = require('axios');

var whiteBox = {backgroundColor: 'white', paddingTop: '10', paddingBottom: '10', margin:'0', border: 'none'};

var TeamProfile = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    game: React.PropTypes.object.isRequired,
    members: React.PropTypes.object.isRequired,
    profile: React.PropTypes.object.isRequired,
    teamName: React.PropTypes.string.isRequired,

  },
  getInitialState: function () {
    return {
      game: {},
      members: {},
      teamCaptian: "",
      profile: {
        teamName: "", 
        times: {
          "weekdays": false,
          "weeknights": false,
          "weekends": false
        },
        purpose: {
          "3x3 Casual": false,
          "5x5 Casual": false,
          "5x5 Ranked": false
        },  
        lanes: {
        "top": false,
        "mid": false,
        "bot": false,
        "jungle": false
        },
        roles: {
          "assassin": false,
          "mage": false,
          "marksman": false,
          "bruiser": false,
          "support": false,
          "tank": false
        },
        about: ""
      }
    };
  },
  componentDidMount: function () {
    var teamToGet = '/team/' + window.location.hash.split('/')[2];
    var context = this;
    Axios.get(teamToGet)
      .then(function(response) {
          console.log(response.data);   
          context.setState({
            game: response.data.game,
            members: response.data.members,
            teamCaptain: response.data.teamCaptain,
            teamName: response.data.profile.teamName,
            times: response.data.profile.times,
            purpose: response.data.profile.purpose,
            lanes: response.data.profile.lanes,
            roles: response.data.profile.roles,
            about: response.data.profile.about,
          });
      });
  },
  handleEdit: function() {
    var router = this.context.router;
    router.transitionTo('teamupdateform', {username: 'username'});
  },
  handleApply: function() {

  },
  render: function () {
    var arrayToString = function(obj) {
      var arr = [];
      for (var key in obj) {
        if (obj[key] === true) {
          arr.push(key);
        }
      }
      return arr.join(', ');
    };
    
    var available = arrayToString(this.state.times);
    var gameTypes = arrayToString(this.state.purpose);
    var laneArray = arrayToString(this.state.lanes);
    var roleArray = arrayToString(this.state.roles);

    return (
      <div>
        <div className="row" style={whiteBox}>
          <div className="col-sm-offset-1 col-sm-2">
            <img className="img-circle center-block" width="128" height="128" src={"http://cdn.cutestpaw.com/wp-content/uploads/2012/09/sss.jpg"} />
          </div>
          <div className="col-sm-4">
            <h3>Team: {this.state.teamName}</h3>
          </div>
          <div className="col-sm-2">
            <img className="center-block" width="128" height="128" src="/img/tier-silver.png"/>
          </div>
          <div className="col-sm-2">
            <img className="center-block" width="128" height="128" src="/img/role-support.png"/>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-6">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <h3 className="text-center">Team Profile </h3>
                <p><b>Available</b>: {available} </p>
                <p><b>Purpose</b>: {gameTypes} </p>
                <p><b>Lanes</b>: {laneArray} </p>
                <p><b>Roles</b>: {this.state.roles} </p>
                <p><b>About Us</b>: {this.state.about} </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <h3 className="text-center">Current Members</h3>
                <p><b>Captain</b>: {this.state.members.isAdmin ? this.state.members.name : "invisible"} </p>
                <p><b>individual ninjas</b>: This could be you buster! </p>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-marksman.png"/>
                <p><b>Lane</b>: Bot </p>
                <p><b>Role</b>: Captain </p>
                
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-assassin.png"/>
                <p><b>Lane</b>: Mid </p>
                <p><b>Role</b>: Assassin </p>
                <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-tank.png"/>
                <p><b>Lane</b>: Front </p>
                <p><b>Role</b>: Tank </p>
                <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-mage.png"/>
                <p><b>Lane</b>: Jungle </p>
                <p><b>Role</b>: Mage </p>
                <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-marksman.png"/>
                <p><b>Lane</b>: Bot </p>
                <p><b>Role</b>: Marksman </p>
                <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-marksman.png"/>
                <p><b>Lane</b>: Fill </p>
                <p><b>Role</b>: Fill </p>
                <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
        <div className={this.state.teamCaptian ? "" : "invisible"}>
          <button className="btn btn-default" type="button" onClick={this.handleEdit}>Edit</button>
        </div>
        </div>
      </div>
    )
  }
});  
    
module.exports = TeamProfile;
