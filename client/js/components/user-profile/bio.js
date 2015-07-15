var React = require('react');
var Axios = require('axios');
var Router = require('react-router');
var BioForm = require('./bio-form');

var Bio = React.createClass({
  mixins: [Router.Navigation],
  propTypes: {
    username: React.PropTypes.string.isRequired,
    bio: React.PropTypes.array.isRequired,
  },
  componentDidMount: function() {
    Axios.get('/user/profile/:id')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        console.log(response);
      });
  },
  componentWillUnmount: function() {
    // this.unbind('bio');
  },
  handleEdit: function() {
    this.transitionTo('bioform', {username: 'username'});
  },
  render: function() {
    return (
      <div>
        <h3>About Me</h3>
        <ul className="list-group">
          {this.props.bio.name && <li className="list-group-item">Name:{this.props.bio.name}</li>}
          {this.props.bio.email && <li className="list-group-item">Email:{this.props.bio.email}</li>}
          {this.props.bio.times && <li className="list-group-item">Times:{this.props.bio.times}</li>}
          {this.props.bio.seeking && <li className="list-group-item">Seeking:{this.props.bio.seeking}</li>}
          {this.props.bio.about && <li className="list-group-item">About:{this.props.bio.about}</li>}
          {this.props.bio.style && <li className="list-group-item">Style:{this.props.bio.style}</li>}
          {this.props.bio.fav && <li className="list-group-item">Fav:{this.props.bio.fav}</li>}
          {this.props.bio.looking && <li className="list-group-item">Looking:{this.props.bio.looking}</li>}
          {this.props.bio.summoner && <li className="list-group-item">Summoner:{this.props.bio.summoner}</li>}
          {this.props.bio.region && <li className="list-group-item">Region:{this.props.bio.region}</li>}
        </ul>
        <span class="list-group-btn">
          <button className="btn btn-default" type="button" onClick={this.handleEdit}>Joe Budden</button>
        </span>
      </div>
    )
  }
});

module.exports = Bio;

    // var items = this.props.bio.map(function(item, index) {
    //   return <li className="list-group-item" key={index}> {item} </li>
    // });
    // return (
    //   <div>
    //   <ul className="list-group">
    //     {items}
    //   </ul>
    //   </div>
    // )
  