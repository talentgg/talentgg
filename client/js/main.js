var React = require('react');
var router = require('./stores/RouteStore.react.jsx').getRouter();
window.React = React;

router.run(function (Handler, state) {
  React.render(<Handler/>, document.getElementById('content'));
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