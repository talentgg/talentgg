var React = require("react");
var Header = require("./header/app-header");
var Landing = require("./landing/app-landing");


var Template = React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        {this.props.children}
        <Landing />
      </div>
    )
  }
});

module.exports = Template;