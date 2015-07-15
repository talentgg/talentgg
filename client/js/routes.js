/*
 OUR ROUTES ARE NOW DEFINED WITH THIS FILE.
 THIS HELPS USE MAINTAIN ALL OUR ROUTES WITHIN
 ONE FILE & IT MAKES MAIN.JS MORE READABLE.
 */


var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

/* COMPONENTS TO RENDER DEPENDING ON THE REQUESTED ROUTE */

var App = require("./components/app");
var SignupPage = require("./components/session/app-signup");
var About = require("./components/about/app-about");
var LoginPage = require("./components/session/app-login");
var UserQuestions = require("./components/user-profile/user-questions.js");

module.exports = (

  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="about" path="/about" handler={About}/>
    <Route name="userquestions" path="/userquestions" source="/questions" handler={UserQuestions}/>
  </Route>

);
