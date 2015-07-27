var React = require('react');
var Router = require('react-router');
var Axios = require('axios');
var _ = require('lodash');
var belle = require('belle');
Button = belle.Button;

var RecUtil = require('../../utils/recUtil.js');

var TeamProfile = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    userId: React.PropTypes.number.isRequired,
    displayName: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      id: null,
      profile: {
        teamName: "",
        times: {
          "weekdays": false,
          "weeknights": false,
          "weekends": false
        },
        purpose: {
          "Casual": false,
          "Ranked": false,
          "3v3": false,
          "5v5": false
        },
        about: "",
        game: {},
      },
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
      members: {},
      captain: {
        name: "",
        id: null
      }
    };
  },
  componentDidMount: function () {
    var teamToGet = "/team/profile/" + window.location.hash.split('/')[2];
    var context = this;
    Axios.get(teamToGet)
      .then(function(response) {
          var cap = null;
          var mems = [];
          _.map(response.data.members, function(member) {
            if (member.isAdmin === true) {
              cap = member;
            } else mems.push(member);
          });
          context.setState({
            id: response.data.id,
            game: response.data.game,
            members: mems,
            profile: response.data.profile,
            captain: cap,
            ads: response.data.ads.data
          });
      });
  },
  componentWillReceiveProps: function () {
    var teamToGet = "/team/profile/" + window.location.hash.split('/')[2];
    var context = this;
    Axios.get(teamToGet)
      .then(function(response) {
        var cap = null;
        var mems = [];
        console.log(response);
        _.map(response.data.members, function(member) {
          if (member.isAdmin === true) {
            cap = member;
          } else mems.push(member);
        });
        context.setState({
          id: response.data.id,
          game: response.data.game,
          members: mems,
          profile: response.data.profile,
          captain: cap,
          ads: response.data.ads
        });
      });
  },
  
  handleEdit: function() {
    var router = this.context.router;
    this.transitionTo('teamupdateform', {username: 'username'}, {teamname: this.state.profile.teamName});
  },

  render: function() {
    var captainName = this.state.captain.name;
    var isCaptain = this.state.captain.id === this.props.userId ? true : false;
    var available = RecUtil.arrayToString(this.state.profile.times);
    var memberNames = [];
    _.map(this.state.members, function(member) {
      memberNames.push(
        <a href={'/#/user/id/' + member.id}><div align="center">{member.name}</div></a>
      )
    });

    return (
      <div>
        <div className="row" id="whitebox">
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
            <div className="panel panel-default" id="whitebox">
              <div className="panel-body">
                <h3 className="text-center">Team Profile </h3>
                <p><b>Available</b>: {available} </p>
                <p><b>About Us</b>: {this.state.profile.about} </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="panel panel-default" id="whitebox">
              <div className="panel-body">
                <h3 className="text-center">Current Members</h3>
                <p><b>Captain</b>: <a href={'/#/user/' + captainName}> { captainName } </a></p>
                <p><b>Members</b>: {memberNames} </p>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <AdList ads={this.state.ads} displayName={this.props.displayName} teamId={this.state.id} user={this.props.userId} captain={this.state.captain.id} />
        <div>
        { this.state.captain.id === this.props.userId ? (<Button primary onClick={this.handleEdit}>Admin</Button>) : null}
        </div>
      </div>
    )
  }
});

module.exports = TeamProfile;

var AdList = React.createClass({
  handleApply: function(e) {
    e.preventDefault();
    $.post('/team/applytoteam', {teamid: this.props.teamId, name: this.props.displayName, adIndex: e.target.value});

  },

  render: function() {
    var adNodes = [];
    for (var i = 0; i < this.props.ads.length; i++) {
      var adLanes = RecUtil.arrayToString(this.props.ads[i]["lanes"])
      var adRoles = RecUtil.arrayToString(this.props.ads[i]["roles"])

// need a way to track if the user's applied and disable the button
      var disableCheck = false;
      var context = this;
    
    _.map(context.props.ads, function(ad){
      if ((ad.applicants && ad.applicants.indexOf(context.props.user) > -1) || context.props.captain === context.props.user) {          
          ad.applicants.indexOf(context.props.user)
          disableCheck = true;
      }
    })
      adNodes.push(         
        <div className="col-sm-2 panel panel-default panel-body" id="whitebox">
            <img className="center-block" width="64" height="64" src="/img/role-mage.png"/>
            <p><b>Lane</b>: {adLanes} </p>
            <p><b>Role</b>: {adRoles} </p>
            <p>{context.props.ads[i]["adCopy"]}</p>
            { disableCheck ? (<Button primary onClick={this.viewApplicants}>View Applicants</Button>) :
            (<Button disabled={disableCheck} value={i} secondary={disableCheck} onClick={this.handleApply}>Apply</Button>)}
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

var ApplicantList = React.createClass({
  render: function() {

  }

})

