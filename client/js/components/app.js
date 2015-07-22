var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('../components/header/app-header');

var App = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div className="app">
        <Header />
        <div className="container">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

module.exports = App;
