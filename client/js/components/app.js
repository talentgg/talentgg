var React = require("react");
var Router = require("react-router-component");
var Template = require("./app-template");
var Registration = require("./registration/registration");
var About = require("./about/app-about");
var Landing = require("./landing/app-landing");
var UserQuestions = require("./user-profile/user-questions.js");
var Locations = Router.Locations;
var Location = Router.Location;

var App = React.createClass({
  render: function () {
    return (
      <Template>
        <Locations>
          <Location path="/" handler= {Landing}/>
          <Location path="/register" handler={Registration}/>
          <Location path="/about" handler={About}/>
          <Location path="/userquestions" handler={UserQuestions}/>
        </Locations>
      </Template>
    )
  }
});

module.exports = App;