var React = require('react');
var Router = require('react-router');

var lolSearch = React.createClass({
  mixins: [Router.Navigation, Router.State],
  getInitialState: function() {
    return 
  },
  render: {
    return (

    )
  }
});

module.exports = lolSearch;

<li>
            <label>Region:</label>
            <select name="region">
              <option value="NA" selected>NA</option>
              <option value="EU">EU</option>
            </select>
          </li>

          <li>
            <label>Summoner id:</label>
            <input name="summoner" placeholder="edit summoner" ref="summoner" />
          </li>