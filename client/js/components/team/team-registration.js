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
        "casual": false,
        "ranked": false,
        "3v3": false,
        "5v5": false
      }
    };
  },
  handleSubmit: function(e) {
    var self = this;
    e.preventDefault();
    var teamBio = this.state;
    $.post("/team/register", teamBio, function(data){
      self.props.updateState(data);
      self.transitionTo('/team/' + teamBio.teamName)
    });
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

          <Button primary type="submit" value="Submit">Submit</Button>

        </form>
      </div>
    )
  }
});

module.exports = TeamRegistration;
