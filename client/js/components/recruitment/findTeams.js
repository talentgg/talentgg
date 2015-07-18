var React = require('react');
var axios = require('axios');

var FindTeams = React.createClass({
  getInitialState: function() {
    return {
      users: []
    };
  },
  componentDidMount: function() {
    var context = this;
    axios.get("/user/all")
      .then(function(response){
        console.log(response)
        context.setState({
          users: response.data
        });
      });
  },  

  handleSubmit: function(e) {

  },
  render: function() {
    return (      
      <div className="findTeams">
        <p> I WORK! </p>

      </div>      
      );
  }
});

module.exports = FindTeams