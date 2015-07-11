var React = require("react");
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Template = require("./app-template");


var APP = React.createClass({
  render: function () {
    return (
      <Template>
        <RouteHandler/>
      </Template>
    )
  }
});


exports.APP = APP;