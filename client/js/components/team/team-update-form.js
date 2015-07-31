var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');
var TeamProfile = require('./team-profile');
var TeamMembers = require('./team-members');
var _ = require('lodash');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;
var Radio = ReactBtn.Radio;

var belle = require('belle');
Button = belle.Button;
TextInput = belle.TextInput;


var TeamUpdateForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Router.State, Router.Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      teamName: "",
      tagLine: "",
      about: "",
      image: "",
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
      adCopy: "Help Wanted",
      members: {},
    };
  },
  componentWillMount: function() {
    var router = this.context.router;
    var name = router.getCurrentQuery().teamname;
    var context = this;
    Axios.get('/team/profile/' + name)
      .then(function(response) {
          context.setState({
            // game: response.data.game, // what's this do here?
            members: response.data.members,
            lookupName: response.data.lookupName,
            teamName: name,
            times: response.data.profile.times,
            purpose: response.data.profile.purpose,
            about: response.data.profile.about,
            tagLine: response.data.profile.tagLine,
            image: response.data.profile.image
          });
      });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var router = this.context.router;
    var name = router.getCurrentQuery().teamname;

    var profileUpload = {
      tagLine: this.state.tagLine,
      about: this.state.about,
      image: this.state.image,
      times: this.state.times,
      purpose: this.state.purpose
    };

    var self = this;

    $.post('/team/update/' + this.state.lookupName, profileUpload, function() {
      self.transitionTo('/team/' + self.state.lookupName, {username: 'username'})
    });
  },

  handleAd: function(e) {
    e.preventDefault();
    var self = this;
    var newAd = {
      lanes: this.state.lanes,
      roles: this.state.roles,
      adCopy: this.state.adCopy,
      applicants: []
    };
    var adPath = '/team/addad/' + this.state.lookupName;
    $.post(adPath, newAd);
    this.transitionTo('/team/' + this.state.lookupName, {username: 'username'});
  },
  removeTeamMember: function(e) {
    var context = this;
    e.preventDefault();
    console.log(e.target.value);
    $.post('/team/removeTeamMember',{
      teamId: this.props.teamId,
      memberName: e.target.value
    }, function(data) {
      context.props.updateTeam(data);
    });
  },
  render: function() {

    var context = this;
    var members = _.map(this.state.members, function(member){
      return (
        <div className="col-sm-6" style={{marginBottom: "15px"}}>
          <div className="col-sm-4">
            <img className="img-circle img-fit" src={member.avatar} />
          </div>
          <div className="col-sm-4">
            <br/>
            <br/>
            <p><h4>{member.name}</h4></p>
          </div>
          <div className="col-sm-4">
            <br/>
            <br/>
            <Button primary onClick={context.removeTeamMember} value={member.name}>Remove</Button>
          </div>
      </div>);
    });

    return (
      <div className="container">
      <form className="form-horizontal" id="teamform" onSubmit={this.handleSubmit}>
        <h2> Team Settings </h2>

        <div className="form-group">
        <label className="control-label col-sm-3 col-md-2">Tagline</label>
        <div className="col-sm-offset-3 col-md-offset-2">
          <TextInput placeholder="Update your description here"
          allowNewLine={ true } name="tagLine" valueLink={this.linkState('tagLine')} />
        </div>
      </div>

      <div className="form-group">
        <label className="control-label col-sm-3 col-md-2">Image Url</label>
        <div className="col-sm-offset-3 col-md-offset-2">
          <TextInput placeholder="Update your image url here"
            allowNewLine={ true } name="image" valueLink={this.linkState('image')} />
        </div>
      </div>

      <div className="form-group">
        <label className="control-label col-sm-3 col-md-2">About Us</label>
        <div className="col-sm-offset-3 col-md-offset-2">
          <TextInput defaultValue="Update about us here."
            allowNewLine={ true } name="about"  valueLink={this.linkState('about')} />
          </div>
      </div>

      <div className="form-group">
        <label className="control-label col-sm-3 col-md-2">Times Available</label>
        <div className="col-sm-9 col-md-10">
          <Checkbox
          label=""
          options={this.state.times}
          onChange={this.setState.bind(this)}
          bootstrap />
        </div>
      </div>

      <div className="form-group">
        <label className="control-label col-sm-3 col-md-2">Purpose</label>
        <div className="col-sm-9 col-md-10">
          <Checkbox
          label=""
          options={this.state.purpose}
          onChange={this.setState.bind(this)}
          bootstrap />
        </div>
      </div>

      <div className="form-group">
        <div className="col-sm-offset-5 col-sm-2">
          <Button primary type="submit" value="Submit">Update</Button>
        </div>
      </div>
      </form>

      <form className="form-horizontal" id="adform" onSubmit={this.handleAd}>   

        <h2> Create New Ad </h2>
        <div className="form-group">
          <label className="control-label col-sm-3 col-md-2">Lanes</label>
          <div className="col-sm-9 col-md-10">
            <Checkbox
            label=""
            options={this.state.lanes}
            onChange={this.setState.bind(this)}
            bootstrap />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3 col-md-2">Roles</label>
          <div className="col-sm-9 col-md-10">
            <Checkbox
            label=""
            options={this.state.roles}
            onChange={this.setState.bind(this)}
            bootstrap />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3 col-md-2">Ad Copy</label>
          <div className="col-sm-offset-3 col-md-offset-2">
            <TextInput defaultValue="Add notes here."
             allowNewLine={true} name="adCopy" valueLink={this.linkState('adCopy')} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-5 col-sm-2">
            <Button primary type="submit" value="Submit">Post New Ad</Button>
          </div>
        </div>
      </form>
      <br/>
      <br/>

        <div className="panel panel-default">
          <div className="panel-body">
            <h2 className="text-center">Current Members</h2>
            <br/>
            {members}
            <br/>
          </div>
        </div>
      </div> 
    )
  }
});

module.exports = TeamUpdateForm;
