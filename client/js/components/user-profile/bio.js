var React = require('react');
var Axios = require('axios');
var Router = require('react-router');
var BioForm = require('./bio-form');

var whiteBox = {backgroundColor: 'white', paddingTop: '10', paddingBottom: '10', margin:'0', border: 'none'};

var Bio = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    displayName: React.PropTypes.string.isRequired,
    bio: React.PropTypes.object.isRequired,
    games: React.PropTypes.object.isRequired
  },
  handleEdit: function() {
    var router = this.context.router;
    router.transitionTo('bioform', {username: 'username'});
  },
  render: function() {
    return (
      <div>
        <div className="row" style={whiteBox}>
          <div className="col-sm-offset-1 col-sm-2">
            <img className="img-circle center-block" src={this.props.games.avatar}/>
          </div>
          <div className="col-sm-4">
            <h3>{this.props.displayName}</h3>
            <p>{this.props.bio.about}</p>
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
                <h3 className="text-center">Profile</h3>
                <p><b>Summoner</b>: {this.props.games.name}</p>
                <p><b>Region</b>: {this.props.games.region}</p>
                <p><b>Plays</b>: {this.props.bio.willdo}</p>
                <p><b>Available</b>: {this.props.bio.times}</p>
                <p><b>Purpose</b>: {this.props.bio.purpose}</p>
                <p><b>Seeking</b>: {this.props.bio.seeking}</p>
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
        </div>
      </div>
    )
  }
});

module.exports = Bio;
