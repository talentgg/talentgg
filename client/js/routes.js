/*
 OUR ROUTES ARE NOW DEFINED WITH THIS FILE.
 THIS HELPS USE MAINTAIN ALL OUR ROUTES WITHIN
 ONE FILE & IT MAKES MAIN.JS MORE READABLE.
 */


var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;


/* COMPONENTS TO RENDER DEPENDING ON THE REQUESTED ROUTE */

var App = require("./components/app");
var SignupPage = require("./components/session/app-signup");
var About = require("./components/about/app-about");
var LoginPage = require("./components/session/app-login");
var UserProfile = require("./components/user-profile/profile");
var Profile = require("./components/user-profile/profile");
var UserQuestions = require("./components/user-profile/user-questions");
var BioForm = require("./components/user-profile/bio-form");
var Settings = require("./components/user-profile/settings");
var NotFound = React.createClass({
  render: function () {
    return <h2>NOT FOUND</h2>;
  }
});

module.exports = (

  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={UserProfile} />
    <Route name="user-profile" path="/user-profile/:username" handler={UserProfile}/>
    <Route name="profile" path="/user-profile" handler={Profile}/>
    <Route name="userquestions" path="/userquestions" source="/questions" handler={UserQuestions}/>
    <Route name="bioform" path="/bioform" handler={BioForm}/>
    <Route name="settings" path="/settings" handler={Settings}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>

);
