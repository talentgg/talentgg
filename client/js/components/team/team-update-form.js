var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');
var TeamProfile = require('./team-profile');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;

var belle = require('belle');
Button = belle.Button;
TextInput = belle.TextInput;


var TeamUpdateForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Router.State, Router.Navigation],
  getInitialState: function() {
    return {
      teamName: "",
      about: "",      
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
    };
  },
  componentDidMount: function() {
    var teamToGet = '/team/' + window.location.hash.split('/')[2];
    var context = this;
    Axios.get(teamToGet)
      .then(function(response) {
          console.log(response.data);   
          context.setState({
            game: response.data.game,
            members: response.data.members,
            teamName: response.data.teamName,
            times: response.data.profile.times,
            purpose: response.data.profile.purpose,
            lanes: response.data.profile.lanes,
            roles: response.data.profile.roles,
            about: response.data.profile.about,
          });
      });
  },
  handleEdit: function() {
    var teamname = this.state.teamName;
    this.transitionTo('teamprofile', {teamname});
  },
  render: function() {
    var teamsName = '/team/update/' + window.location.hash.split('/')[2];
    // this.state.teamName
    return (
      <div className="container">
        <form method="POST" action={teamsName}>

          About Us: <TextInput defaultValue="This TextInput has allowNewLine set to true. Just press 'Return' once editing the text."
          allowNewLine={ true } name="about" valueLink={this.linkState('about')} />

          <Checkbox
          label='Times Available: '
          options={this.state.times}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Checkbox
          label='Purpose: '
          options={this.state.purpose}
          onChange={this.setState.bind(this)}
          bootstrap />

          <h2> Needs </h2>
          <Checkbox
          label='lanes: '
          options={this.state.lanes}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Checkbox
          label='roles: '
          options={this.state.roles}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Button primary type="submit" onClick={this.handleEdit}>Submit</Button>

        </form>
      </div>
    )
  }
});

module.exports = TeamUpdateForm;
