var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;
var Radio = ReactBtn.Radio;

var belle = require('belle');
Button = belle.Button;
TextInput = belle.TextInput;

var TeamRegistration = React.createClass({
  mixins: [Router.State, Router.Navigation, React.addons.LinkedStateMixin],
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
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var teamBio = this.state;
    $.post("/team/register", teamBio, function(){
      location.href='/#/';
      location.reload();
    })
  },
  render: function() {
    var teamName = this.state.teamName,
     about = this.state.about;
    return (
      <div className="container">
        <form id="teamform" onSubmit={this.handleSubmit}>
          <h1> Team Settings </h1>

          <label> Team Name: </label><TextInput defaultValue=""
           allowNewLine={ false } maxLength="16" name="teamName"  valueLink={this.linkState('teamName')} />

          <label>About Us: </label> <TextInput defaultValue="We haven't filled this out yet."
           allowNewLine={ true } name="about"  valueLink={this.linkState('about')} />

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

          <Button primary type="submit" value="Submit">Submit</Button>

        </form>
      </div>
    )
  }
});

module.exports = TeamRegistration;
