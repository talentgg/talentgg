var React = require("react");

// we would actually call our help function for getting team members & map them into list items
var teamMembers = [
  {name: "Alan", img: null },
  {name: "Stu", img: null },
  {name: "Doug", img: null },
  {name: "Philip", img: null }
];


var TeamBio = React.createClass({
  render: function () {
    return (
      <div>
        <div>
          <img src={'http://vignette1.wikia.nocookie.net/thehangover/images/0/08/TheWolfpackBlog.jpg/revision/latest?cb=20140807131149'}/>
          <h1>Wolfpack</h1>

          <h4>Purpose: 5 v 5 Ranked</h4>
          <h4>Captain: CrazyEd</h4>
          <h4>Seeking: Support, Bot</h4>
        </div>

        <div>
          <h2>Team Bio:</h2>
          <p>We're four nice guys looking for one more to complete our wolfpack</p>

          <h2>Style:</h2>
          <p>We like to play aggresive</p>


          <button>Apply to this team</button>
        </div>
      </div>
    )
  }
});

var TeamMembers = React.createClass({
  render: function () {
    var members = teamMembers.map(function(m){
      return <li key={m.id}> {m.name} </li>
    });
    return (
      <div>
        <h2>Team Members</h2>
        <ul>
          {members}
        </ul>
        <div>

        </div>
      </div>
    )
  }
});

var TeamProfile = React.createClass({
  render: function () {
    return (
      <div>
        <TeamBio />
        <TeamMembers />
      </div>
    )
  }
});

React.render(<TeamProfile/>, document.body);



module.exports = TeamProfile;