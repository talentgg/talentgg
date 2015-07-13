/* THIS IS WHERE OUR INDEX LOOKS TO MOUNT OUR APP.
 * WE ALSO PROVIDE ALL THE ROUTES USING REACT ROUTER  */

var React = require('react');
var router = require('./stores/RouteStore').getRouter();
window.React = React;

router.run(function (Handler, state) {
  React.render(<Handler/>, document.getElementById('content'));
});

