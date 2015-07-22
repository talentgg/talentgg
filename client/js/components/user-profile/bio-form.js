var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');
var Profile = require('./profile');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;

var belle = require('belle');
Button = belle.Button;
TextInput = belle.TextInput;


var BioForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Router.State, Router.Navigation],
  getInitialState: function() {
    return {
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
      about: "",
      favorite: "",
      willdo: {
        "top": false,
        "jungle": false,
        "support": false,
        "mid": false,
        "adc": false
      },
      wontdo: {
        "top": false,
        "jungle": false,
        "support": false,
        "mid": false,
        "adc": false
      },
    };
  },
  componentDidMount: function() {
    var context = this;
    Axios.get('/profile').
      then(function(response) {
        context.setState({
          times: response.data.bio.times,
          purpose: response.data.bio.purpose,
          about: response.data.bio.about,
          favorite: response.data.bio.favorite,
          willdo: response.data.bio.willdo,
          wontdo: response.data.bio.wontdo,
        });
      });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    $.post("/profile", bio);
  },
  render: function() {

    return (
      <div className="container">
        <form id="bioform" onSubmit={this.handleSubmit}>

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

          <Checkbox
          label='Will Do: '
          options={this.state.willdo}
          onChange={this.setState.bind(this)}
          bootstrap />

          <Checkbox
          label='Will not: '
          options={this.state.wontdo}
          onChange={this.setState.bind(this)}
          bootstrap />

          About Me: <TextInput defaultValue="This TextInput has allowNewLine set to true. Just press 'Return' once editing the text."
           allowNewLine={ true } name="about" valueLink={this.linkState('about')} />

          Favorite Games: <TextInput defaultValue="This TextInput has allowNewLine set to true. Just press 'Return' once editing the text."
           allowNewLine={ true } name="favorite" valueLink={this.linkState('favorite')} />

          <Button primary type="submit" value="Submit">Submit</Button>

        </form>
      </div>
    )
  }
});

module.exports = BioForm;
