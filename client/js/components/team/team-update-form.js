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
  contextTypes: {
    router: React.PropTypes.func
  },

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
      adCopy: "Help Wanted"
    };
  },
  componentWillMount: function() {
    var router = this.context.router;
    var name = router.getCurrentQuery().teamname;
    console.log(name);
    var context = this;
    Axios.get('/team/profile/' + name)
      .then(function(response) {   
          console.log(name);       
          context.setState({
            // game: response.data.game, // what's this do here?
            members: response.data.members,
            teamName: name,
            times: response.data.profile.times,
            purpose: response.data.profile.purpose,
            about: response.data.profile.about,
          });
      });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var router = this.context.router;
    var name = router.getCurrentQuery().teamname;
    console.log("submit");
    console.log(name);
    console.log(this.state.teamName);

    var profileUpload = {
      about: this.state.about,
      times: this.state.times,
      purpose: this.state.purpose
    };
    $.post('/team/update/' + this.state.teamName, profileUpload);
  },
  handleAd: function(e) {
    e.preventDefault();
    var newAd = {
      lanes: this.state.lanes,
      roles: this.state.roles,
      adCopy: this.state.adCopy
    }
    var adPath = '/team/addad/' + this.state.teamName;
    $.post(adPath, newAd);
  },
  render: function() {
    
    return (
      <div className="container">
        <form>
          About Us: <TextInput placeholder="update your description here"
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

          <Button type="submit" onClick={this.handleSubmit} >Submit Changes</Button>

          <h3> Create New Ad </h3>
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

          <TextInput placeholder="Add notes here." allowNewLine={true} name="adCopy" valueLink={this.linkState('adCopy')} />

          <Button primary type="submit" onClick={this.handleAd} >Post New Ad</Button>

        </form>
      </div>
    )
  }
});

module.exports = TeamUpdateForm;
