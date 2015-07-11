var App = require("./components/app.js");
var React = require("react");
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

<<<<<<< HEAD

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

/*
  RIGHT NOW LANDING SHOWS UP WITH THE TEMPLATE, HERE IS HOW WE WILL FIX IT WITH AUTH ROUTES
 <Route handler={Application}>
   <Route handler={Authed}> // VIEWS NESTED WHEN THEY ARE AUTHENTICATED
     <Route name="dashboard" handler={Dashboard}/>
     < name="profile" handler={Profile}/>
   </Route>
   <Route handler={NotAuthed}> // VIEWS WHEN THEY ARE NOT AUTHENTICATED
     <Route name="login" handler={Login}/>
     <Route name="about" handler={About}/>
   </Route>
 </Route>



 */
=======
React.render(<App/>, document.getElementById('root'));
>>>>>>> avatar component
