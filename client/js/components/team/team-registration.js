var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;
var Radio = ReactBtn.Radio;

var belle = require('belle');
Button = belle.Button;
TextInput = belle.TextInput;
TextArea = belle.TextArea;

var TeamRegistration = React.createClass({
  mixins: [Router.State, Router.Navigation, React.addons.LinkedStateMixin],
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
      self.transitionTo('/team/' + teamBio.teamName.toLowerCase().replace(' ', '-'))
    });
  },
  render: function() {
    var teamName = this.state.teamName,
    about = this.state.about;
    return (
      <form className="form-horizontal" id="teamform" onSubmit={this.handleSubmit}>
        <h1> Team Registration </h1>

        <div className="form-group">
        <label className="control-label col-sm-3 col-md-2">Tagline</label>
        <div className="col-sm-offset-3 col-md-offset-2">
          <TextInput defaultValue="This TextInput has allowNewLine set to true. Just press 'Return' once editing the text."
           allowNewLine={ true } name="tagLine" valueLink={this.linkState('tagLine')} />
        </div>
      </div>

      <div className="form-group">
        <label className="control-label col-sm-3 col-md-2">Team Name</label>
        <div className="col-sm-offset-3 col-md-offset-2">
          <TextInput defaultValue="Enter team name."
           allowNewLine={ false } maxLength="16" name="teamName"  valueLink={this.linkState('teamName')} />
        </div>
      </div>

      <div className="form-group">
        <label className="control-label col-sm-3 col-md-2">Image Url</label>
        <div className="col-sm-offset-3 col-md-offset-2">
          <TextInput placeholder="Please upload your image url here"
            allowNewLine={ true } name="image" valueLink={this.linkState('image')} />
        </div>
      </div>

      <div className="form-group">
        <label className="control-label col-sm-3 col-md-2">About Us</label>
        <div className="col-sm-offset-3 col-md-offset-2">
          <TextInput defaultValue="We haven't filled this out yet."
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
          <Button primary type="submit" value="Submit">Submit</Button>
        </div>
      </div>

      </form>
    )
  }
});

module.exports = TeamRegistration;
