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

var Header = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string
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
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
