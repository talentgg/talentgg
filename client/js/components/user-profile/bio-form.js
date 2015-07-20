var React = require('react');
var Router = require('react-router');
var Axios = require('axios');
var Profile = require('./profile');

var BioForm = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    username: React.PropTypes.string.isRequired,
    bio: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    var context = this;
    Axios.get('/profile').
      then(function(response) {
        context.setState({
          times: response.data.bio.times,
          seeking: response.data.bio.seeking,
          purpose: response.data.bio.purpose,
          about: response.data.bio.about,
          favorite: response.data.bio.favorite
        });
      });  
  },
  handleChange: function(e) {
    this.setState({
      times: e.target.value,
      seeking: e.target.value,
      purpose: e.target.value,
      about: e.target.value,
      favorite: e.targe.value
    });
  },
  render: function() {
    return (
      <div className="container">
        <form method="POST" action="/profile" >
          <li>
            <label>Times Available:</label>
            <select className="form-control" name="times" value={this.state.times} onChange={this.handleChange}>
              <option value="weekdays" selected>Weekdays</option>
              <option value="weeknights">Weeknights</option>
              <option value="weekends">Weekends</option>
            </select> 
          </li>
          <li>
            <label>Seeking:</label>
            <select className="form-control" name="seeking" value={this.state.seeking} onChange={this.handleChange}>
              <option value="seeking" selected>Seeking</option>
              <option value="recruiting">Recruiting</option>
              <option value="neither">Neither</option>
            </select> 
          </li>
          <li>
            <label>Purpose:</label>
            <select className="form-control" name="purpose" value={this.state.purpose} onChange={this.handleChange}>
              <option value="2v2 ranked" selected>2v2 Ranked</option>
              <option value="3v3 casual">3v3 Casual</option>
              <option value="5v5 casual">5v5 Casual</option>
              <option value="5v5 ranked">5v5 Ranked</option>
            </select> 
          </li>
          <li className="form-group checkbox inline no_indent">
            <label>Will Do:</label>
            <label className="checkbox inline no_indent">
              <input type="checkbox" name="willdo" value="tank " onChange={this.handleChange} />Tank
            </label>  
            <label className="checkbox inline no_indent">
              <input type="checkbox" name="willdo" value=" jungle" onChange={this.handleChange} />Jungle
            </label>  
            <label className="checkbox inline no_indent">
              <input type="checkbox" name="willdo" value=" support" onChange={this.handleChange} />Support
            </label>
            <label className="checkbox inline no_indent"> 
              <input type="checkbox" name="willdo" value=" mid" onChange={this.handleChange} />Mid
            </label>
            <label className="checkbox inline no_indent">  
              <input type="checkbox" name="willdo" value=" adc" onChange={this.handleChange} />ADC
            </label>
            <label className="checkbox inline no_indent">  
              <input type="checkbox" name="willdo" value=" fill" onChange={this.handleChange} />Fill
            </label>
          </li>
          <li>
            <label>About Me:</label>
            <textarea name="about" className="form-control" placeholder="edit about" ref="about" value={this.state.about} onChange={this.handleChange}></textarea>
          </li>
          <li>
            <label>Favorite Games:</label>
            <input name="favorite" className="form-control" placeholder="edit favorite games" ref="favorite" value={this.state.favorite} onChange={this.handleChange}/>
          </li>
          <button type="submit" className="btn btn-sml">Submit</button>
        </form>
      </div>
    )
  }
});

module.exports = BioForm;


