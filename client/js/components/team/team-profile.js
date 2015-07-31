var React = require('react');
var Router = require('react-router');
var Axios = require('axios');
var _ = require('lodash');
var AdList = require('./adList');
var TeamMembers = require('./team-members');

var belle = require('belle');
Button = belle.Button;

var RecUtil = require('../../utils/recUtil.js');

var TeamProfile = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    userId: React.PropTypes.number.isRequired,
    displayName: React.PropTypes.string.isRequired,
    ratings: React.PropTypes.object.isRequired,
    counter: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      teamId: null,
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
        tagLine: "",
        about: "",
        game: {},
      },
      ads: {data: [{          // test ad
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
      }]},
      members: {},
      teamRatings: {},
      captain: {
        name: "",
        id: null
      }
    };
  },

  componentDidMount: function() {
    var self = this;
    $.get('/team/profile/' + window.location.hash.split('/')[2], function(response){
      self.setState({
        teamId: response.id,
        game: response.game,
        captain: response.members[0],
        members: response.members,
        profile: response.profile,
        teamRatings: response.ratings,
        ads: response.ads
      })
    })
  },

  updateTeam: function(newState, callback){
    this.setState(newState, callback);
  },

  handleEdit: function() {
    var router = this.context.router;
    this.transitionTo('teamupdateform', {username: 'username'}, {teamname: this.state.profile.teamName});
  },

  handleAds: function() {
    var router = this.context.router;
    this.transitionTo('createad', {username: 'username'}, {teamname: this.state.profile.teamName});
  },

  render: function() {
    var available = RecUtil.arrayToString(this.state.profile.times);
    var purpose = RecUtil.arrayToString(this.state.profile.purpose);

    return (
      <div>
        <div className="row whitebox">
          <div className="col-sm-offset-1 col-sm-2">
            <img className="img-circle center-block img-fit" src={this.state.profile.image} />
          </div>
          <div className="col-sm-4">
            <h3>Team: {this.state.profile.teamName}</h3>
            <p>{this.state.profile.tagLine}</p>
          </div>
          <div className="col-sm-2">
            <img className="center-block img-fit" src="/img/tier-silver.png"/>
          </div>
          <div className="col-sm-2">
            { this.state.captain.id === this.props.userId ? (<Button primary onClick={this.handleEdit}>Admin</Button>) : null}
          </div>
        </div>
        <br/>

        <div className="row">
          <div className="col-sm-8">
            <div className="panel panel-default whitebox">
              <div className="panel-body">
                <h3 className="text-center">Team Profile </h3>
                <p><b>Available</b>: {available} </p>
                <p><b>Purpose</b>: {purpose} </p>
                <p><b>About Us</b>: {this.state.profile.about} </p>
              </div>
            </div>
            <br/>
            <div className="panel panel-default whitebox">
              <div className="panel-body">
                <h3 className="text-center">Current Members</h3>
                <br/>
                <TeamMembers members={this.state.members} />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <AdList
            ads={this.state.ads}
            displayName={this.props.displayName}
            teamRatings={this.state.teamRatings}
            teamId={this.state.teamId}
            userId={this.props.userId}
            captain={this.state.captain}
            myRatings={this.props.ratings}
            avatar={this.props.avatar}
            games={this.props.games}
            updateTeam={this.updateTeam}
            />
          </div>
        </div>
        <br/>
    </div>
    )
  }
});

module.exports = TeamProfile;
