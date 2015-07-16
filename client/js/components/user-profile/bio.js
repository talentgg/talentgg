var React = require('react');
var Axios = require('axios');
var Router = require('react-router');
var BioForm = require('./bio-form');

var Bio = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    username: React.PropTypes.string.isRequired,
    bio: React.PropTypes.object.isRequired
  },
  handleEdit: function() {
    var router = this.context.router;
    router.transitionTo('bioform', {username: 'username'});
  },
  render: function() {
    return (
      <div className="container">
        <h3>About Me</h3>
        <ul className="list-group">
          {<li className="list-group-item"><img src={this.props.bio.avatar_url}></img></li>}
          {<li className="list-group-item">Name:{this.props.username}</li>}
          {<li className="list-group-item">Times:{this.props.bio.times}</li>}
          {<li className="list-group-item">Seeking:{this.props.bio.seeking}</li>}
          {<li className="list-group-item">About:{this.props.bio.about}</li>}
          {<li className="list-group-item">Fav:{this.props.bio.fav}</li>}
          {<li className="list-group-item">Looking:{this.props.bio.looking}</li>}
          {<li className="list-group-item">Summoner:{this.props.bio.summoner}</li>}
          {<li className="list-group-item">Region:{this.props.bio.region}</li>}
        </ul>
        <span class="list-group-btn">
          <button className="btn btn-default" type="button" onClick={this.handleEdit}>Joe Budden</button>
        </span>
      </div>
    )
  }
});

module.exports = Bio;