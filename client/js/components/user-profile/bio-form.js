var React = require('react');
var Router = require('react-router');
var Axios = require('axios');

var BioForm = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    username: React.PropTypes.string.isRequired,
  },
  handleSubmit: function() {
    // Axios.post('/profile')
    // finish axios post
    var router = this.context.router;
    var username = this.getParams().username;
    router.transitionTo('profile', {username: username});
  },
  render: function() {
    return (
      <div className="BioForm">
        <form method="POST" action="/profile" >
          <li>
            <label>Times Available</label>
            <input name="times" placeholder="edit times" ref="times" />
          </li>
          <li>
            <select name="seeking">
              <option value="seeking" selected>Seeking</option>
              <option value="recruiting">Recruiting</option>
              <option value="neither">Neither</option>
            </select> 
          </li>
          <li>
            <label>About</label>
            <textarea name="about" placeholder="edit about" ref="about"></textarea>
          </li>
          <li>
            <label>Fav</label>
            <input name="fav" placeholder="edit fav games" ref="fav" />
          </li>
          <li>
            <label>Looking</label>
            <input name="looking" placeholder="edit looking for" ref="looking" />
          </li>
          <li>
            <label>Summoner id</label>
            <input name="summoner" placeholder="edit summoner" ref="summoner" />
          </li>
          <li>
            <label>Region</label>
            <input name="region" placeholder="edit region" ref="region" />
          </li>
          <button onClick={this.handleSubmit}>Joe Budden</button>
        </form>
      </div>
    )
  }
});

module.exports = BioForm;