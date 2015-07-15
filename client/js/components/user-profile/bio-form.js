var React = require('react');
var Router = require('react-router');

var BioForm = React.createClass({
  mixins: [Router.Navigation],
  propTypes: {
    username: React.PropTypes.string.isRequired,
  },
  handleSubmit: function() {
    // etc. etc.
    var obj = this.refs.getDOMNodes().value;
    console.log('obj: ');
    console.log(obj);
  },
  render: function() {
    return (
      <div className="BioForm">
        <form method="POST" action="/user" >
          <li>
            <label>username</label>
            <input name="username" placeholder="edit" ref="username" />
          </li>
          <li>
            <label>email</label>
            <input name="email" placeholder="edit email" ref="email" />
          </li>
          <li>
            <label>Times</label>
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
            <input name="about" placeholder="edit about" ref="about" />
          </li>
          <li>
            <label>Style</label>
            <input name="style" placeholder="edit style, strengths & weaknesses" ref="style" />
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
          <button>Joe Budden</button>
        </form>
      </div>
    )
  }
});

module.exports = BioForm;