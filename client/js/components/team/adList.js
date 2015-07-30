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

  userWithdraw: function(e){ // Need to get this working - make a button for it (instead of disabled button) and remove them from array
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

  captainReject: function(e){ // I work
    var self = this;
    e.preventDefault();
    $.post('/team/removeFromAd', {
      teamId: this.props.teamId,
      adIndex: e.target.value.split('&')[1],
      name: e.target.value.split('&')[2]
    }, function(data){
      self.props.updateTeam(data);
    });
  },

  removeAd: function(e){
    var self = this;
    e.preventDefault();
    $.post('/team/removeAd', {
      teamId: this.props.teamId,
      index: e.target.value
    }, function(data){
      self.props.updateTeam(data);
    })
  },

  render: function() {
    var context = this;
    var isAdmin = this.state.captain.id === this.props.userId;
    var grayFloat = {backgroundColor: '#eee', marginBottom: '10px'};
    var whiteFloat = {backgroundColor: '#fff', marginBottom: '10px'};
    var adNodes = [];

    for (var i = 0; i < this.state.ads.length; i++) {
      var adLanes = RecUtil.arrayToString(this.state.ads[i]["lanes"]);
      var adRoles = RecUtil.arrayToString(this.state.ads[i]["roles"]);
      var applicantNodes = [];
      var notApplied = true;

      // var matchScore = RecUtil.calculateMatchScore(applicant.ratings, this.state.teamRatings)

      _.map(this.state.ads[i].applicants, function(applicant, index) {
        if(isAdmin){
          applicantNodes.push(
            <div className="row" key={index} style={index%2 === 1 ? grayFloat : whiteFloat }>
              <div className="col-sm-5">
                <a style={{verticalAlign: '-125%'}} href={"/#/user/" + applicant.name} target=" _blank">{applicant.name}</a>
              </div>
              <div className="col-sm-7">
                <Button className="pull-right" value={applicant.id + "&" + index + "&" + applicant.name} secondary={isAdmin} onClick={context.captainReject}>reject</Button>
                <Button className="pull-right" value={applicant.id + "&" + index + "&" + applicant.name} secondary={isAdmin} onClick={context.captainApprove}>approve</Button>
              </div>
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
            <br/>
            <div className="row">
              { isAdmin ? (<Button style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} value={i} onClick={this.removeAd}>Remove</Button>) :
              (<Button disabled={this.props.games.verified && notApplied ? "" : "disabled"} value={i} secondary={isAdmin} onClick={this.userApply}>Apply</Button>)}
            </div>
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
