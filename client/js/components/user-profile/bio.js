var React = require('react');
var Axios = require('axios');
var Router = require('react-router');
var BioForm = require('./bio-form');

var Bio = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    displayName: React.PropTypes.string.isRequired,
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
        <div className="container col-md-2 pull-left">Picture:
          <img src={this.props.bio.avatar_url}></img>
        </div>
          <div className="container col-md-10 pull-right list-group">
            <h3>About Me</h3>
              <ul className="list-group">
                <li className="list-group-item">Name:{this.props.displayName}</li>
                <li className="list-group-item">Times:{this.props.bio.times}</li>
                <li className="list-group-item">Purpose:{this.props.bio.purpose}</li>
                <li className="list-group-item">Seeking:{this.props.bio.seeking}</li>
                <li className="list-group-item">Will Do:{this.props.bio.willdo}</li>
                <li className="list-group-item">Favorite Games:{this.props.bio.favorite}</li>
                <li className="list-group-item">About:{this.props.bio.about}</li>
              </ul>
            <span class="list-group-btn">
              <button className="btn btn-default" type="button" onClick={this.handleEdit}>Edit</button>
            </span>
          </div>
      </div>
    )
  }
});

module.exports = Bio;
