var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');
var TeamProfile = require('./team-profile');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;
var Radio = ReactBtn.Radio;

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
      }        
    }
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
            role1: response.data.profile.role1,
            role2: response.data.profile.role2,
            role3: response.data.profile.role3,
            role4: response.data.profile.role4,
            role5: response.data.profile.role5,
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

          <h3> Role 1 </h3>
          <Radio
          label='lanes: '
          options={this.state.role1.lanes}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Checkbox
          label='roles: '
          options={this.state.role1.roles}
          onChange={this.setState.bind(this)}
          bootstrap />

          <h3> Role 2 </h3>
          <Radio
          label='lanes: '
          options={this.state.role2.lanes}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Checkbox
          label='roles: '
          options={this.state.role2.roles}
          onChange={this.setState.bind(this)}
          bootstrap />

          <h3> Role 3 </h3>
          <Radio
          label='lanes: '
          options={this.state.role3.lanes}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Checkbox
          label='roles: '
          options={this.state.role3.roles}
          onChange={this.setState.bind(this)}
          bootstrap />

          <h3> Role 4 </h3>
          <Radio
          label='lanes: '
          options={this.state.role4.lanes}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Checkbox
          label='roles: '
          options={this.state.role4.roles}
          onChange={this.setState.bind(this)}
          bootstrap />

          <h3> Role 5 </h3>
          <Radio
          label='lanes: '
          options={this.state.role5.lanes}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Checkbox
          label='roles: '
          options={this.state.role5.roles}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Button primary type="submit" onClick={this.handleEdit}>Submit</Button>

        </form>
      </div>
    )
  }
});

module.exports = TeamUpdateForm;
