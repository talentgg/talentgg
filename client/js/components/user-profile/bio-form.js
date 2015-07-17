var React = require('react');
var Router = require('react-router');
var Axios = require('axios');

var BioForm = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    username: React.PropTypes.string.isRequired,
  },
  render: function() {
    return (
      <div className="BioForm">
        <form method="POST" action="/profile" >
          <li>
            <label>Times Available:</label>
            <select name="times">
              <option value="weekdays" selected>Weekdays</option>
              <option value="weeknights">Weeknights</option>
              <option value="weekends">Weekends</option>
            </select> 
          </li>
          <li>
            <label>Seeking:</label>
            <select name="seeking">
              <option value="seeking" selected>Seeking</option>
              <option value="recruiting">Recruiting</option>
              <option value="neither">Neither</option>
            </select> 
          </li>
          <li>
            <label>Purpose:</label>
            <select name="purpose">
              <option value="2v2 ranked" selected>2v2 Ranked</option>
              <option value="3v3 casual">3v3 Casual</option>
              <option value="5v5 casual">5v5 Casual</option>
              <option value="5v5 ranked">5v5 Ranked</option>
            </select> 
          </li>
          <li>
            <label>Region:</label>
            <select name="region">
              <option value="NA" selected>NA</option>
              <option value="EU">EU</option>
            </select>
          </li>
          <li>
            <label>Will Do:</label>
              Tank <input type="checkbox" name="willdo" value="tank " /> 
              Jungle <input type="checkbox" name="willdo" value="jungle " /> 
              Support <input type="checkbox" name="willdo" value="support " /> 
              Mid <input type="checkbox" name="willdo" value="mid " /> 
              ADC <input type="checkbox" name="willdo" value="adc " /> 
              Fill <input type="checkbox" name="willdo" value="fill " />
          </li>
          <li>
            <label>Wont Do:</label>
              Tank <input type="checkbox" name="wontdo" value="tank " /> 
              Jungle <input type="checkbox" name="wontdo" value="jungle " /> 
              Support <input type="checkbox" name="wontdo" value="support " /> 
              Mid <input type="checkbox" name="wontdo" value="mid " /> 
              ADC <input type="checkbox" name="wontdo" value="adc " /> 
              Fill <input type="checkbox" name="wontdo" value="fill " />
          </li>
          <li>
            <label>Summoner id:</label>
            <input name="summoner" placeholder="edit summoner" ref="summoner" />
          </li>
          <li>
            <label>About Me:</label>
            <textarea name="about" placeholder="edit about" ref="about"></textarea>
          </li>
          <li>
            <label>Favorite Games:</label>
            <input name="favorite" placeholder="edit favorite games" ref="fav" />
          </li>
          <button type="submit" className="btn btn-sml">Joe Budden</button>
        </form>
      </div>
    )
  }
});

module.exports = BioForm;
