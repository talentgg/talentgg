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
              {/* These are the left-aligned navbar components */}
              {/* I recommend this side be used for our services (my teams, browse matches, tinder-like recommender) */}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {/* These are the right-aligned navbar components */}
              {/* I recommend this side be used for notifications and self-referentials (my profile, my settings) */}
              <li><Link to="/profile"><span className="glyphicon glyphicon-envelope"></span></Link></li>
              <li><Link to="/profile"><span className="glyphicon glyphicon-user"></span> Username</Link></li>
              <li><Link to="/profile"><span className="glyphicon glyphicon-user"></span> My Profile</Link></li>
              <li className="dropdown">
                <Link to='/' className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></Link>
                <ul className="dropdown-menu">
                  <li><Link to="/">Action</Link></li>
                  <li><Link to="/">Another action</Link></li>
                  <li><Link to="/">Something else here</Link></li>
                </ul>
              </li>
              <li><Link to="/profile"><span className="glyphicon glyphicon-search"></span> Recruitment </Link></li>
              <li><Link to="/profile"><span className="glyphicon glyphicon-off"></span> Sign Out</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
