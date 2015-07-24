var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;

var belle = require('belle');
Button = belle.Button;
TextInput = belle.TextInput;

var TeamRegistration = React.createClass({
  mixins: [Router.State, Router.Navigation, React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      teamName: "", 
      profile: {
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
    // onSubmit={this.handleSubmit}
  },
  // handleSubmit: function(e) {
  //   e.preventDefault();
  //   var profile = this.state;
  //   $.post("/team/register", profile);
  //   this.transitionTo('teamprofile', {teamname: 'teamname'});
  // },  
  render: function() {
    var teamName = this.state.teamName,
     about = this.state.about;
    return (
      <div className="container">
        <form method="POST" action="/team/register">
          <h1> Team Settings </h1>

          <label> Team Name: </label><TextInput defaultValue=""
           allowNewLine={ false } maxLength="16" name="teamName"  valueLink={this.linkState('teamName')} />

          <label>About Us: </label> <TextInput defaultValue="We haven't filled this out yet." 
           allowNewLine={ true } name="about"  valueLink={this.linkState('about')} />
           
          <Checkbox
          label='Times Available: '
          options={this.state.profile.times}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Checkbox
          label='Purpose: '
          options={this.state.profile.purpose}
          onChange={this.setState.bind(this)}
          bootstrap />

          <h2> Needs </h2>
          <Checkbox
          label='lanes: '
          options={this.state.profile.lanes}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Checkbox
          label='roles: '
          options={this.state.profile.roles}
          onChange={this.setState.bind(this)}
          bootstrap />

          <button type="submit" className="btn btn-sml">Submit</button>
        
        </form>
      </div>
    )
  }
});

module.exports = TeamRegistration;
