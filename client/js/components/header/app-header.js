var React = require("react");
var Link = require("react-router-component").Link;


var Header = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Talent.gg</h1>
        /* add navigation */
        <Link href="/register">Register</Link>
        <Link href="/about">About</Link>
        <Link href="/userquestions">Questions(testing)</Link>
      </div>
    );
  }
});

module.exports = Header;