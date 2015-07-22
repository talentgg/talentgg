var React = require('react');
var Router = require('react-router');
var Axios = require('axios');

var whiteBox = {backgroundColor: 'white', paddingTop: '10', paddingBottom: '10', margin:'0', border: 'none'};

var TeamProfile = React.createClass({
  mixins: [ Router.Navigation, Router.State ],
  getInitialState: function () {
    return {
      teams: {},
      games: {}
    };
  },
  componentDidMount: function () {
    var context = this;
    $.get('/team/*')
      .then(function(response) {
        context.setState({
          team: response.data.team,
          games: response.data.games
        });
      });
  },
  render: function () {
    
    var arrayToString = function(obj) {
    var string = [];
    for (var key in obj) {
      if (obj[key] === true) {
        string.push(key);
      }
    }
    return string.toString();
    };

    var available = arrayToString(this.props.data.times);
    var will = arrayToString(this.props.data.willdo);
    var seeking = arrayToString(this.props.data.purpose);
    var members = arrayToString(this.props.members);

    return (

      <div>
        <div className="row" style={whiteBox}>
          <div className="col-sm-offset-1 col-sm-2">
            <img className="img-circle center-block" src={this.props.games.avatar} />
          </div>
          <div className="col-sm-4">
            <h3>{this.props.teamName}</h3>
            <p>{this.props.data.about}</p>
          </div>
          <div className="col-sm-2">
            <img className="center-block" width="128" height="128" src="/img/tier-silver.png"/>
          </div>
          <div className="col-sm-2">
            <img className="center-block" width="128" height="128" src="/img/role-support.png"/>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-6">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <h3 className="text-center">Team Profile </h3>
                <p><b>Plays</b>: {will}</p>
                <p><b>Available</b>: {available} </p>
                <p><b>Purpose</b>: {seeking} </p>
                <p><b>Captain</b>: {this.props.data.captain} </p>
                <p><b>About Us</b>: {this.props.data.about} </p>
                <p><b>Style</b>: {this.props.data.style} </p>
                <button className="btn btn-default" type="button" onClick={this.handleEdit}>Edit</button>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <h3 className="text-center">Recent Games</h3>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="panel panel-default" style={whiteBox}>
              <div className="panel-body">
                <h3 className="text-center">Current Members</h3>
                <p><b>individual ninjas</b>: {members} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = TeamProfile;

