var React = require('react');
var Router = require('react-router');
var Axios = require('axios');
var _ = require('lodash');

var belle = require('belle');
Button = belle.Button;

var RecUtil = require('../../utils/recUtil.js');

var AdList = React.createClass({

  propTypes: {
    ads: React.PropTypes.object.isRequired,
    userId: React.PropTypes.number.isRequired,
    captain: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      ads: this.props.ads.data,
      captain: this.props.captain
    }
  },

  componentWillReceiveProps: function(props){
    this.setState({
      ads: props.ads.data,
      userId: props.userId,
      captain: props.captain
    })
  },

  userApply: function(e) { // I work
    var self = this;
    e.preventDefault();
    $.post('/team/applyToTeam', {
      teamId: this.props.teamId,
      name: this.props.displayName,
      adIndex: e.target.value,
      ratings: this.props.myRatings
    }, function(data){
      self.props.updateTeam(data);
    });
  },

  userWithdraw: function(e){
    var self = this;
    e.preventDefault();
    console.log("trigger user withdraw");
  },

  captainApprove: function(e){ // I work
    var self = this;
    e.preventDefault();
    var approval = e.target.value.split('&');
    $.post('/team/addToTeam', {
      userId: approval[0],
      ad: approval[1],
      name: approval[2],
      teamId: this.props.teamId,
      ratings: this.props.myRatings,
      avatar: this.props.avatar //this needs to change as it captures the captain's own avatar, not the user's
    }, function(data){
      self.props.updateTeam(data);
    });
  },

  captainReject: function(e){
    var self = this;
    e.preventDefault();
    $.post('/team/removeFromAd', {
      teamId: this.props.teamId,
      adIndex: e.target.value.split('&')[1],
      name: e.target.value.split('&')[2]
    }, function(ads){
      console.log(ads);
      self.props.updateTeam(ads);
    });
  },

  removeAd: function(e){
    var self = this;
    e.preventDefault();
    console.log("trigger remove ad");
  },

  render: function() {
    console.log(this.state);
    var context = this;
    var isAdmin = this.state.captain.id === this.props.userId;
    var adNodes = [];

    for (var i = 0; i < this.state.ads.length; i++) {
      var adLanes = RecUtil.arrayToString(this.state.ads[i]["lanes"]);
      var adRoles = RecUtil.arrayToString(this.state.ads[i]["roles"]);
      var applicantNodes = [];
      var notApplied = true;
      // need a way to track if the user's applied and disable the button

      // var matchScore = RecUtil.calculateMatchScore(applicant.ratings, this.state.teamRatings)

      _.map(this.state.ads[i].applicants, function(applicant, index) {
        if(isAdmin){
          applicantNodes.push(
            <div key={index}>
              <a href={"/#/user/" + applicant.name} target=" _blank">{applicant.name}</a>
              <Button value={applicant.id + "&" + index + "&" + applicant.name} secondary={isAdmin} onClick={context.captainApprove}>approve</Button>
              <Button value={applicant.id + "&" + index + "&" + applicant.name} secondary={isAdmin} onClick={context.captainReject}>reject</Button>
            </div>
          )
        } else if(applicant.id === context.props.userId){
          notApplied = false;
        }

      })

      adNodes.push(
        <div key={i}>
          <div className="panel panel-default panel-body whitebox">
            <img className="center-block" width="64" height="64" src="/img/role-mage.png"/>
            <p><b>Lane</b>: {adLanes} </p>
            <p><b>Role</b>: {adRoles} </p>
            <p>{context.state.ads[i]["adCopy"]}</p>
            {applicantNodes}
            { isAdmin ? (<Button primary onClick={this.removeAd}>Remove</Button>) :
            (<Button disabled={this.props.games.verified && notApplied ? "" : "disabled"} value={i} secondary={isAdmin} onClick={this.userApply}>Apply</Button>)}
          </div>
          <br/>
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

module.exports = AdList;
