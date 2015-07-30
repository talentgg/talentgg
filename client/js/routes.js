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
var Profile = require("./components/profile/profile"); //User's profile
var UserProfile = require("./components/user/viewProfile"); //Viewing other users
var TeamRegistration = require("./components/team/team-registration"); //Making a team
var TeamProfile = require("./components/team/team-profile"); //Viewing a team
var TeamUpdateForm = require("./components/team/team-update-form");
var FindPlayers = require("./components/recruitment/findPlayers"); //Finding players/teams
var Messages = require("./components/profile/messages");
var Settings = require("./components/settings/settings"); //Changing email/password
var About = require("./components/settings/about"); //About page
var NotFound = React.createClass({
  render: function () {
    return <h2>NOT FOUND</h2>;
  }
});

module.exports = (

  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Profile} />
    <Route name="profile" path="/profile" handler={Profile}/>
    <Route name="user-profile" path="/user/:username" handler={UserProfile}/>
    <Route name="teamregistration" path="/teamregistration" handler={TeamRegistration}/>
    <Route name="teamprofile" path="/team/:teamname" handler={TeamProfile}/>
    <Route name="teamupdateform" path="/teamupdate" handler={TeamUpdateForm}/>
    <Route name="findplayers" path="/findplayers" handler={FindPlayers}/>
    <Route name="messages" path="/messages" handler={Messages}/>
    <Route name="settings" path="/settings" handler={Settings}/>
    <Route name="about" path="/about" handler={About}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>

);
