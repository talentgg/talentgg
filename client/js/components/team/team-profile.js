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
        ads: [{          // test ad    
          lanes: {
            top: false,
            mid: false,
            bot: false,
            jungle: true
          },
          roles: {
            assassin: false,
            mage: false,
            marksman: false,
            bruiser: false,
            support: false,
            tank: false
          },
          adCopy: "we need a jungler like tarzan."
        }],        
        game: {},        
      },
      members: {},
      captain: {
        name: "",
        id: null
      }
    };
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
              console.log("CAP");
              console.log(member);
              cap = member;
            } else mems.push(member);
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
    console.log("name");
    console.log(this.state.captain.name);
    var captainName = this.state.captain.name;
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
    var memberNames = [];
    _.map(this.state.members, function(member) {
      memberNames.push(
        <a href={'/#/user/id/' + member.id}><div align="center">{member.name}</div></a>
      )
    })

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
<<<<<<< HEAD
                <p><b>Captain</b>: {this.state.captain} </p>
                <p><b>Members</b>: {this.state.members} </p>
=======
                <p><b>Captain</b>: <a href={'/#/user/id/' + this.state.captain.id}> { captainName } </a></p>
                <p><b>Members</b>: {memberNames} </p>
>>>>>>> 8d12b3ad11b404c71c3a03c21af4a3d3d49123b3
              </div>
            </div>
          </div>
        </div>
        <br/>
        <AdList ads={this.state.profile.ads} />
        <div className="row">
          <div className={this.state.captain ? this.state.displayName : "invisible"}>
            <button className="btn btn-default" type="button" onClick={this.handleEdit}>Edit</button>
          </div>
        </div>
      </div>
    )
  }
});  
    
module.exports = TeamProfile;

var AdList = React.createClass({
render: function() {
    var adNodes = [];
    for (var i = 0; i < this.props.ads.length; i++) {      
      adNodes.push(      
         <div className="col-sm-2">
          <div className="panel panel-default" style={whiteBox}>
            <div className="panel-body">
              <img className="center-block" width="64" height="64" src="/img/role-mage.png"/>
              <p><b>Lane</b>: {this.props.ads[i]["lane"]} </p>
              <p><b>Role</b>: {this.props.ads[i]["role"]} </p>
              <button className="btn btn-default" type="button" onClick={this.handleApply}>Apply</button>
            </div>
          </div>
        </div>
      )    
    };
    return (
      <div className="answersList">
        {adNodes}
      </div>
    );
  }
});
