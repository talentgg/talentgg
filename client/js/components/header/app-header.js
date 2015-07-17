/* OUR HEADER INHERITS PROPS FROM OUR MAIN APP COMPONENT
 * THIS LETS IT ACCESS THE SESSIONSTORE TO CHECK IF SOMEONE IS LOGGED IN.
 * IF THEY ARE NOT LOGGED IN WE DISPLAY LOGIN OR SIGNUP.
 * IF THEY ARE LOGGED IN WE WOULD DISPLAY SOMETHING CUSTOM,
 * HAVE A PLACE HOLDER CURRENTLY
 */


var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../../actions/SessionActionCreators');

var list = this;
console.log('this is the state' + JSON.stringify(list));

var Header = React.createClass({

  teams: ['teamA', 'teamB', 'teamC'],

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string,
    teams: ReactPropTypes.array
  },
  logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Talent.gg</Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/"><span className="glyphicon glyphicon-search"></span> Recruitment</Link></li>
              <li className="dropdown">
                <Link to='/' className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Teams <span className="caret"></span></Link>
                <ul className="dropdown-menu">
                  <li><Link to="/">Team1 Placeholder</Link></li>
                  <li><Link to="/">Team2 Placeholder</Link></li>
                  <li><Link to="/">...</Link></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="profile"><span className="glyphicon glyphicon-user"></span> My Profile</Link></li>
              <li><Link to="/"><span className="glyphicon glyphicon-envelope"></span></Link></li>
              <li className="dropdown">
                <Link to='/' style={{fontSize: '20px'}} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-cog"></span></Link>
                <ul className="dropdown-menu">
                  <li><Link to="/">Settings</Link></li>
                  <li><Link to="/">Logout</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
