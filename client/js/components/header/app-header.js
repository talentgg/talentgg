var React = require("react");
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;


var Header = React.createClass({
  render: function () {
    return (
      <div>
        <Link to="/"><h1>Talent.gg</h1></Link>

        /* add navigation */
        <Link to="register">Register</Link>
        <Link to="about">About</Link>
      </div>
    );
  }
});

module.exports = Header;