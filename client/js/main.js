/* THIS IS WHERE OUR INDEX LOOKS TO MOUNT OUR APP.
 * WE ALSO PROVIDE ALL THE ROUTES USING REACT ROUTER  */

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var ga = require('react-ga');

var router = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});

ga.initialize('UA-54996226-4');
router.run(function (Handler, state) {
  ga.pageview(state.pathname);
  React.render(<Handler/>, document.body);
});
