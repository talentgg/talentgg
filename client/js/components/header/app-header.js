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
    /*var rightNav = this.props.isLoggedIn ? (

      /!* WHAT TO DISPLAY IN THE HEADER IF THEY ARE LOGGED IN *!/

      <ul>
        <li><Link to="login">Login</Link></li>
        <li><Link to="signup">Sign up</Link></li>
      </ul>

    ) : (

      /!* WHAT TO DISPLAY IF THEY ARENT LOGGED IN (PLACEHOLDER) *!/

      <ul>
        <li><Link to="login">Login</Link></li>
        <li><Link to="signup">Sign up</Link></li>
      </ul>
    );*/

    return (
      <div>

        <Link to="/"><h1>Talent.gg</h1></Link>

        <li><Link to="login">Login</Link></li>
        <li><Link to="signup">Sign up</Link></li>

      </div>
    );
  }
});

module.exports = Header;
