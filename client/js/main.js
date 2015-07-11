var App = require("./components/app.js");
var React = require("react");
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;


var Registration = require("./components/registration/registration");
var About = require("./components/about/app-about");
var Landing = require("./components/landing/app-landing");

APP = require('./components/app').APP;

var routes = (
  <Route handler={APP}>
    <Route name="register" handler={Registration}/>
    <Route name="landing" handler={Landing}/>
    <Route name="about" handler={About}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('root'));
});
