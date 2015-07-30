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
      adCopy: "Help Wanted"
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
    }
    var adPath = '/team/addad/' + this.state.lookupName;
    $.post(adPath, newAd);
    this.transitionTo('/team/' + this.state.lookupName, {username: 'username'});
  },
  render: function() {
    console.log(this.state);
    return (
      <div className="container">

        <form>
          Tagline: <TextInput placeholder="update your description here"
          allowNewLine={ true } name="tagLine" valueLink={this.linkState('tagLine')} />

          About Us: <TextInput placeholder="update your description here"
          allowNewLine={ true } name="about" valueLink={this.linkState('about')} />

          Image Url: <TextInput placeholder="please upload your image url here"
          allowNewLine={ true } name="image" valueLink={this.linkState('image')} />

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

          <Button primary type="submit" value="submit" onClick={this.handleAd} >Post New Ad</Button>

        </form>
      </div>
    )
  }
});

module.exports = TeamUpdateForm;
