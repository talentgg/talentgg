var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

/* COMPONENTS TO RENDER DEPENDING ON THE REQUESTED ROUTE */

var App = require("./components/app");
var SignupPage = require("./components/registration/registration");
var About = require("./components/about/app-about");
var Landing = require("./components/landing/app-landing");

module.exports = (

  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Landing} />
    /*<Route name="login" path="/login" handler={LoginPage}/>*/
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="about" path="/about" handler={About}/>
  </Route>

);

/* OUR ROUTES ARE NOW DEFINED WITH THIS FILE.
   THIS HELPS USE MAINTAIN ALL OUR ROUTES WITHIN
   ONE FILE & IT MAKES MAIN.JS MORE READABLE.
 */