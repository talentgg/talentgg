var React = require('react');
var Router = require('react-router');
var Axios = require('axios');

var TeamRegistration = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {},
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="container">
        <h1> Team Settings </h1>
        <form method="POST" action="/team/register">
          <li>
            <label> Team Name: </label>
            <input name="teamName" className="form-control" placeholder="enter a team name" type="text" />
          </li>
          <li>
            <label>Times Available:</label>
            <select className="form-control" name="times" value="weekends">
              <option value="weekdays">Weekdays</option>
              <option value="weeknights">Weeknights</option>
              <option value="weekends">Weekends</option>
            </select>
          </li>
          <li className="form-group checkbox inline no_indent">
            <label> Looking For: </label>
            <label className="checkbox inline no_indent">
              <input type="checkbox" name="willdo" value="tank "/>Tank
            </label>
            <label className="checkbox inline no_indent">
              <input type="checkbox" name="willdo" value="jungle"/>Jungle
            </label>
            <label className="checkbox inline no_indent">
              <input type="checkbox" name="willdo" value="support"/>Support
            </label>
            <label className="checkbox inline no_indent">
              <input type="checkbox" name="willdo" value="mid"/>Mid
            </label>
            <label className="checkbox inline no_indent">
              <input type="checkbox" name="willdo" value="adc"/>ADC
            </label>
            <label className="checkbox inline no_indent">
              <input type="checkbox" name="willdo" value="fill"/>Fill
            </label>
          </li>
          <li>
            <label>About Us:</label>
            <textarea name="about" className="form-control" placeholder="Enter team description" ref="about" value={this.state.about}></textarea>
          </li>
          <button type="submit" className="btn btn-sml">Submit</button>
        </form>
      </div>
    )
  }
});

module.exports = TeamRegistration;
