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
var UserProfile = require("./components/user-profile/profile");
var Profile = require("./components/user-profile/profile");
var UserQuestions = require("./components/user-profile/user-questions");
var BioForm = require("./components/user-profile/bio-form");
var Settings = require("./components/user-profile/settings");

module.exports = (

  <Route name="app" path="/" handler={App}>
    <Route name="user-profile" path="/user-profile/:username" handler={UserProfile}/>
    <Route name="profile" path="/user-profile" handler={Profile}/>
    <Route name="userquestions" path="/userquestions" source="/questions" handler={UserQuestions}/>
    <Route name="bioform" path="/bioform" handler={BioForm}/>
    <Route name="settings" path="/settings" handler={Settings}/>
  </Route>

);

/*
These routes no longer seem necessary given they're handled in a different context entirely

<Route name="login" path="/login" handler={LoginPage}/>
<Route name="signup" path="/signup" handler={SignupPage}/>
<Route name="about" path="/about" handler={About}/>
*/
