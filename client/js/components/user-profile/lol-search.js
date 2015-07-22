var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');

var LolSearch = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Router.Navigation, Router.State],
  getInitialState: function() {
    return {
      name: "",
      region: ""
    };  
  },
  componentDidMount: function() {
    var context = this;
    Axios.get('/profile')
      .then(function(response) {
        context.setState({
          bio: response.data.bio,
          name: response.data.games.name,
          region: response.data.games.region
        });
      });  
  },
  handleSearch: function() {
    // return json object to user
    // hide search component
    // transition to verify
  },
  render: function() {
    return(
      <div className="container">
        <form className="form-horizontal" method="POST" action="/setSummoner">
          <div className="form-group">
            <label className="col-sm-2 control-label">Summoner ID</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="name" valueLink={this.linkState('name')} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Region</label>
            <div className="col-sm-10">
              <select className="form-control" name="region" valueLink={this.linkState('region')}>
                <option value="NA" selected>NA</option>
                <option value="EUW">EUW</option>
                <option value="EUNE">EUNE</option>
                <option value="KR">KR</option>
                <option value="BR">BR</option>
                <option value="LAN">LAN</option>
                <option value="LAS">LAS</option>
                <option value="OCE">OCE</option>
                <option value="RU">RU</option>
                <option value="TR">TR</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default>" onclick={this.handleSearch}>Search</button>
            </div>
          </div>
        </form>
      </div>
      )
    }
});

module.exports = LolSearch;
