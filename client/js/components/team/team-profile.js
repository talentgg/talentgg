var React = require('react');
var Router = require('react-router');
var Axios = require('axios');
var _ = require('lodash');

var whiteBox = {backgroundColor: 'white', paddingTop: '10', paddingBottom: '10', margin:'0', border: 'none'};

var TeamProfile = React.createClass({
  mixins: [Router.State, Router.Navigation],
  // propTypes: {
  //   game: React.PropTypes.object.isRequired,
  //   members: React.PropTypes.object.isRequired,
  //   teamBio: React.PropTypes.object.isRequired,
  //   teamName: React.PropTypes.string.isRequired,
  // },
  getInitialState: function () {
    return {
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
        about: "",
        role1: {       
          lanes: {
            top: false,
            mid: false,
            bot: false,
            jungle: false
          },
          roles: {
            assassin: false,
            mage: false,
            marksman: false,
            bruiser: false,
            support: false,
            tank: false
          }
        },
        role2: {       
          lanes: {
            top: false,
            mid: false,
            bot: false,
            jungle: false
          },
          roles: {
            assassin: false,
            mage: false,
            marksman: false,
            bruiser: false,
            support: false,
            tank: false
          }
        },
        role3: {       
          lanes: {
            top: false,
            mid: false,
            bot: false,
            jungle: false
          },
          roles: {
            assassin: false,
            mage: false,
            marksman: false,
            bruiser: false,
            support: false,
            tank: false
          }
        },
        role4: {       
          lanes: {
            top: false,
            mid: false,
            bot: false,
            jungle: false
          },
          roles: {
            assassin: false,
            mage: false,
            marksman: false,
            bruiser: false,
            support: false,
            tank: false
          }
        },
        role5: {       
          lanes: {
            top: false,
            mid: false,
            bot: false,
            jungle: false
          },
          roles: {
            assassin: false,
            mage: false,
            marksman: false,
            bruiser: false,
            support: false,
            tank: false
          }
        },
        game: {},
        members: {},
        captain: {
          displayName: ""
        }
      }
    }
  },
  componentWillMount: function () {
    var teamToGet = "/team/profile/" + window.location.hash.split('/')[2];
    console.log(teamToGet);
    var context = this;
    Axios.get(teamToGet)
      .then(function(response) {
          var cap = null;
          var mems = [];
          console.log(response.data);
          _.map(response.data.members, function(member) {
            console.log(member);
            console.log(member.isAdmin);
            if (member.isAdmin === true) {
              cap = member;
            } else mems.push(member) 
          });

          context.setState({
            game: response.data.game,
            members: mems,
            profile: response.data.profile,
            captain: cap
          });

      });
  },
  handleApply: function() {

  },
  handleEdit: function() {
    var router = this.context.router;
    router.transitionTo('teamupdateform', {username: 'username'});
  },
  render: function () {
    console.log("times");
    console.log(this.state.profile.times);
    console.log(this.state.profile);
    var arrayToString = function(obj) {
      var arr = [];
      for (var key in obj) {
        if (obj[key] === "true") {
          arr.push(key);
        }
      }
      return arr.join(', ');
    };

    var available = arrayToString(this.state.profile.times);
    var lane1Array = arrayToString(this.state.profile.role1.lanes);
    var role1Array = arrayToString(this.state.profile.role1.roles);
    var lane2Array = arrayToString(this.state.profile.role1.lanes);
    var role2Array = arrayToString(this.state.profile.role1.roles);
    var lane3Array = arrayToString(this.state.profile.role1.lanes);
    var role3Array = arrayToString(this.state.profile.role1.roles);
    var lane4Array = arrayToString(this.state.profile.role1.lanes);
    var role4Array = arrayToString(this.state.profile.role1.roles);
    var lane5Array = arrayToString(this.state.profile.role1.lanes);
    var role5Array = arrayToString(this.state.profile.role1.roles);

    return (
      <div>
        <div className="row" style={whiteBox}>
          <div className="col-sm-offset-1 col-sm-2">
            <img className="img-circle center-block" width="128" height="128" src={"http://cdn.cutestpaw.com/wp-content/uploads/2012/09/sss.jpg"} />
          </div>
          <div className="col-sm-4">
            <h3>Team: {this.state.profile.teamName}</h3>
            <p>{this.state.profile.about}</p>
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
                <p><b>About Us</b>: {this.state.profile.about} </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <h3 className="text-center">Current Members</h3>
                <p><b>Captain</b>: {this.state.members[0][name]} </p>
                <p><b>Members</b>: {this.state.members.name} </p>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-marksman.png"/>
                <p><b>Lane</b>: {role1Array === "" ? 'any' : roleArray} </p>
                <p><b>Role</b>: {lane1Array === "" ? 'any' : laneArray} </p>
                <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-assassin.png"/>
                <p><b>Lane</b>: {role2Array === "" ? 'any' : roleArray} </p>
                <p><b>Role</b>: {lane2Array === "" ? 'any' : laneArray} </p>
                <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-tank.png"/>
                <p><b>Lane</b>: {role3Array === "" ? 'any' : roleArray} </p>
                <p><b>Role</b>: {lane3Array === "" ? 'any' : laneArray} </p>
                <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-mage.png"/>
                <p><b>Lane</b>: {role4Array === "" ? 'any' : roleArray} </p>
                <p><b>Role</b>: {lane4Array === "" ? 'any' : laneArray} </p>
                <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <img className="center-block" width="64" height="64" src="/img/role-marksman.png"/>
                <p><b>Lane</b>: {role5Array === "" ? 'any' : roleArray} </p>
                <p><b>Role</b>: {lane5Array === "" ? 'any' : laneArray} </p>
                <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className={this.state.captain.name ? this.state.displayName : "invisible"}>
            <button className="btn btn-default" type="button" onClick={this.handleEdit}>Edit</button>
          </div>
        </div>
      </div>
    )
  }
});  
    
module.exports = TeamProfile;
