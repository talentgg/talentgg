var React = require('react');
var Router = require("react-router");
var Route = Router.Route;

var Test = React.createClass({
  propTypes: {
    displayName: React.PropTypes.string.isRequired,
    avatar: React.PropTypes.string.isRequired,
    bio: React.PropTypes.object.isRequired,
    games: React.PropTypes.object.isRequired,
    temp: React.PropTypes.object.isRequired
  },

  render: function() {
    var whiteBox = {backgroundColor: 'white', paddingTop: '10', paddingBottom: '10', margin:'0', border: 'none'};
    return(
      <div>
        <div className="row" style={whiteBox}>
          <div className="col-sm-offset-1 col-sm-2">
            <img className="img-circle center-block" src={this.props.avatar} />
          </div>
          <div className="col-sm-4">
            <h3>{this.props.displayName}</h3>
            <p>{this.props.bio.about}</p>
          </div>
          <div className="col-sm-2">
            <img className="center-block" width="128" height="128" src={"/img/tier-" + this.props.temp.rank + ".png"} />
          </div>
          <div className="col-sm-2">
            <img className="center-block" width="128" height="128" src="/img/role-support.png"/>
          </div>
        </div>
        <br/>
        <div className="row">
          <ul className="nav nav-pills nav-justified" role="tablist">
            <li role="presentation" className="active"><a href="#profile" aria-controls="profile" role="tab" data-toggle="pill">Profile</a></li>
            <li role="presentation"><a href="#edit" aria-controls="edit" role="tab" data-toggle="pill">Edit</a></li>
            <li role="presentation"><a href="#questions" aria-controls="questions" role="tab" data-toggle="pill">Questions</a></li>
            <li role="presentation"><a href="#chart" aria-controls="chart" role="tab" data-toggle="pill">Chart</a></li>
          </ul>
        </div>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active" id="profile">
            <h2>Profile</h2>
          </div>
          <div role="tabpanel" className="tab-pane" id="edit">
            <h2>Edit</h2>
          </div>
          <div role="tabpanel" className="tab-pane" id="questions">
            <h2>Questions</h2>
          </div>
          <div role="tabpanel" className="tab-pane" id="chart">
            <h2>Chart</h2>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Test;
