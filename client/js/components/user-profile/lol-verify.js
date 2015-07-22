var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');
var LolSearch = require('./lol-search');
var LolUpdate = require('./lol-update');

var LolVerify = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Router.Navigation],
  getInitialState: function() {
    return {
      name: "",
      region: "",
      verifyKey: ""
    };
  },
  componentWillMount: function() {
    var context = this;
    Axios.get('/profile/games')
      .then(function(res) {
        context.setState({
          name: res.data.name,
          region: res.data.region,
          key: res.data.verifyKey
        });
      });
  },
  handleVerify: function() {
    $.get('/team/*', function(result){
      console.log(result);
    });
  },
  render: function() {
    return (
      <div>

      <button type="submit" onClick={this.handleVerify}>Verify deez</button>
      </div>
    )
  }
});

module.exports = LolVerify;
