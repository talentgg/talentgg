var React = require('react/addons');
var Router = require('react-router');
var Axios = require('axios');
var Profile = require('./profile');

var BioForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Router.State, Router.Navigation],
  getInitialState: function() {
    return {
      times: "",
      seeking: "",
      purpose: "",
      about: "",
      summoner: "",
      favorite: "",
      willdo: {
        tanks: "",
        jungle: "",
        support: "",
        mid: "",
        adc: "",
        fill: ""
      }
    };
  },
  componentWillMount: function() {
    var context = this;
    Axios.get('/profile').
      then(function(response) {
        context.setState({
          bio: response.data.bio.times,
          seeking: response.data.bio.seeking,
          purpose: response.data.bio.purpose,
          summoner: response.data.bio.name,
          region: response.data.bio.region,
          about: response.data.bio.about,
          favorite: response.data.bio.favorite,
          tank: response.data.bio.willdo.tank,
          jungle: response.data.bio.willdo.jungle,
          support: response.data.bio.willdo.support,
          mid: response.data.bio.willdo.mid,
          adc: response.data.bio.willdo.adc,
          fill: response.data.bio.willdo.fill
        });
      }); 
  },
  render: function() {
    return (
      <div className="container">
        <form className="form-horizontal" method="POST" action="/profile" >

          <div className="form-group">
            <label className="col-sm-2 control-label">Times Available:</label>
            <div className="col-sm-10">
              <select className="form-control" name="times" valueLink={this.linkState('times')}>
                <option value="weekdays" selected>Weekdays</option>
                <option value="weeknights">Weeknights</option>
                <option value="weekends">Weekends</option>
              </select> 
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Seeking:</label>
            <div className="col-sm-10">
              <select className="form-control" name="seeking" valueLink={this.linkState('seeking')}>
                <option value="seeking" selected>Seeking</option>
                <option value="recruiting">Recruiting</option>
                <option value="neither">Neither</option>
              </select> 
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Purpose:</label>
            <div className="col-sm-10">
              <select className="form-control" name="purpose" valueLink={this.linkState('purpose')}>
                <option value="2v2 ranked" selected>2v2 Ranked</option>
                <option value="3v3 casual">3v3 Casual</option>
                <option value="5v5 casual">5v5 Casual</option>
                <option value="5v5 ranked">5v5 Ranked</option>
              </select> 
            </div>
          </div>

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
            <label className="col-sm-2 control-label">About Me:</label>
            <div className="col-sm-10">
              <textarea type="text" name="about" className="form-control" valueLink={this.linkState('about')}></textarea>
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Favorite Games:</label>
            <div className="col-sm-10">
              <input type="text" name="favorite" className="form-control" valueLink={this.linkState('favorite')} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Will Do:</label>
          </div> 

          <div className="form-group">
            <label className="col-sm-2 control-label">Tank</label>
            <div className="checkbox inline col-sm-10">
                <input type="checkbox" name="willdo" value="tank" checkedLink={this.linkState('tank')} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Jungle</label>
            <div className="checkbox inline col-sm-10">
                <input type="checkbox" name="willdo" value="jungle" checkedLink={this.linkState('jungle')} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Support</label>
            <div className="checkbox inline col-sm-10">
                <input type="checkbox" name="willdo" value="support" checkedLink={this.linkState('support')} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Mid</label>
            <div className="checkbox inline col-sm-10">
                <input type="checkbox" name="willdo" value="mid" checkedLink={this.linkState('mid')} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">ADC</label>
            <div className="checkbox inline col-sm-10">
                <input type="checkbox" name="willdo" value="adc" checkedLink={this.linkState('adc')} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Fill</label>
            <div className="checkbox inline col-sm-10">
                <input type="checkbox" name="willdo" value="fill" checkedLink={this.linkState('fill')} />
            </div>
          </div>
        
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default>">Update</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = BioForm;
