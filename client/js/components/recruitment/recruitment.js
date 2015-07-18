var React = require('react');
var axios = require('axios');

var Recruitment = React.createClass({
  getInitialState: function() {
    return {
      test: "test"
    };
  },
  componentDidMount: function() {
    var context = this;
  },  

  handleSubmit: function(e) {

  },
  render: function() {
    return (      
      <div className="recruitment">
        <p> I WORK! </p>

      </div>      
      );
  }
});

module.exports = Recruitment