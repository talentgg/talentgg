var React = require('react');
var Router = require('react-router');
var belle = require('belle');
TextInput = belle.TextInput;
Select = belle.Select;
Option = belle.Option;

var AccountLink = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    displayName: React.PropTypes.string.isRequired,
    games: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {
      displayName: this.props.displayName,
      verifyKey: this.props.games.verifyKey,
      verified: this.props.games.verified,
      region: this.props.games.region
    };
  },

  componentWillReceiveProps: function(props){
    this.setState({
      displayName: props.displayName,
      verifyKey: props.games.verifyKey,
      verified: props.games.verified,
      region: props.games.region
    })
  },

  setSummoner: function(e){
    var self = this;
    e.preventDefault();
    $.post("/setSummoner", {displayName: this.state.displayName, region: this.state.region}, function(data){
      self.props.updateState(data);
    });
  },

  verifySummoner: function(e){
    var self = this;
    e.preventDefault();
    $.post("/verifySummoner", null, function(data){
      self.props.updateState(data);
      window.location.assign('/#/');
    });
  },

  handleChange: function(e) {
    this.setState({
      region: e.value
    });
  },

  regionList: ['na', 'eune', 'euw', 'kr', 'br', 'lan', 'las', 'oce', 'ru', 'tr'],

  render: function(){
    return(
      <div>
        <h2>Account Status: {this.state.verified ? <span style={{color: 'green'}}>Connected</span> : <span style={{color: 'red'}}>Not Connected</span>}</h2>
        <h3>Look up your profile</h3>
        <br/>
        <form className="form-horizontal" onSubmit={this.setSummoner}>
          <div className="form-group">
            <label className="col-sm-2 control-label">Summoner</label>
            <div className="col-sm-4">
              <TextInput allowNewLine={ false } name="name" valueLink={this.linkState('displayName')} />
            </div>
            <label className="col-sm-2 control-label">Region</label>
            <div className="col-sm-2">
              <Select className="form-control" onUpdate={this.handleChange}>
                {this.regionList.map(function(val, i){ return <Option key={i} value={val}>{val.toUpperCase()}</Option> })}
              </Select>
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-default btn-block">Lookup</button>
            </div>
          </div>
          <p className={this.state.verified ? "text-danger" : "invisible"}>Performing a lookup will unset your current summoner profile!</p>
        </form>
        <div className={this.state.verifyKey !== '' ? "" : "invisible"}>
          <form className="form-horizontal" onSubmit={this.verifySummoner}>
            <h3>Verify Account</h3>
            <br/>
            <div className="form-group">
              <div className="col-sm-10">
                <span className="text-center">In order to verify your account you must change the name of your <b>first rune page</b> to: <b>{this.state.verifyKey}</b></span>
              </div>
              <div className="col-sm-2">
                <button type="submit" className="btn btn-default btn-block">Verify</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = AccountLink;
