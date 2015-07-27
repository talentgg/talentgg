var React = require('react');
var Router = require('react-router');
var Axios = require('axios');
var _ = require('lodash');

var belle = require('belle');
Button = belle.Button;

var RecUtil = require('../../utils/recUtil.js');

var AdList = React.createClass({
  handleApply: function(e) {
    e.preventDefault();
    var application = {
      teamid: this.props.teamId,
      name: this.props.displayName,
      adIndex: e.target.value,
      ratings: this.props.myRatings
    }
    $.post('/team/applytoteam', application);

  },
  removeAd: function(e){
    e.preventDefault();
    // $.post('/team/removead', {adIndex: e.target.value});     // <-- make this
  },
  approve: function(e){
    e.preventDefault();
    console.log("approve");
    console.log(e.target.value);
    var approval = e.target.value.split('&');
    $.post('/team/addtoteam', {userid: approval[0], ad: approval[1], displayName: approval[2], teamId: this.props.teamId});
  },
  reject: function(e){
    console.log("HELP")
  },

  render: function() {
    var adNodes = [];
    console.log("start")
    for (var i = 0; i < this.props.ads.length; i++) {
      var adLanes = RecUtil.arrayToString(this.props.ads[i]["lanes"])
      var adRoles = RecUtil.arrayToString(this.props.ads[i]["roles"])

// need a way to track if the user's applied and disable the button
      var adminCheck = false;
      var context = this;
    
      _.map(context.props.ads, function(ad){
        // if ((ad.applicants && ad.applicants.indexOf(context.props.user) > -1) || context.props.captain === context.props.user) {          
          if (context.props.captain === context.props.user) {          
            ad.applicants.indexOf(context.props.user)
            adminCheck = true;
        }
      })

      // var matchScore = RecUtil.calculateMatchScore(applicant.ratings, this.props.teamRatings)

      var applicantNodes = [];
      _.map(this.props.ads[i].applicants, function(applicant, index) {
        console.log(applicant);
        applicantNodes.push(
          <div>
            <a href={"/#/user/" + applicant.name}>{applicant.name}</a> 50%
            { adminCheck ? (<div><Button value={applicant.id + "&" + index + "&" + applicant.name} secondary={adminCheck} onClick={context.approve}>approve</Button>
            <Button value={applicant.id + "&" + index + "&" + applicant.name} secondary={adminCheck} onClick={context.reject}>reject</Button></div>) : null }            
          </div>
          )
      })
      console.log("adNode")

      adNodes.push(         
        <div className="col-sm-2" id="whitebox">
            <img className="center-block" width="64" height="64" src="/img/role-mage.png"/>
            <p><b>Lane</b>: {adLanes} </p>
            <p><b>Role</b>: {adRoles} </p>
            <p>{context.props.ads[i]["adCopy"]}</p>
            {applicantNodes}
            { adminCheck ? (<Button primary onClick={this.removeAd}>Remove</Button>) :
            (<Button disabled={adminCheck} value={i} secondary={adminCheck} onClick={this.handleApply}>Apply</Button>)}
        </div>
      )
    };
    console.log("render")
    return (
      <div className="answersList">
        {adNodes}
      </div>
    );
  }
});

module.exports = AdList;
