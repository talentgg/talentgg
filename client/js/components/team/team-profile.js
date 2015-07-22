var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var Team = React.createClass({

  mixins: [ Router.Navigation, Router.State ],

  getInitialState: function () {

  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  componentWillReceiveProps: function () {

  },

  render: function () {
    var team = this.state.team || {};
    var name = this.state.team.name;
    var image = this.state.team.img;
    var purpose = this.state.team.purpose;
    var captain = this.state.team.captain;
    var seeking = this.state.team.seeking;
    var about = this.state.team.about;
    var style = this.state.team.style;
    console.log(this.state.team);

    var members = this.state.team.members.map(function(member) {
      return <li key={member.id}> {member.name} </li>
    });

    return (
      <div>
        <div>
          <img
            src={image}/>
          <h1>{name}</h1>

          <h4>{purpose}</h4>
          <h4>{captain}</h4>
          <h4>{seeking}</h4>
        </div>

        <div>
          <h2>Team Bio:</h2>
          <p>{about}</p>

          <h2>Style:</h2>
          <p>{style}</p>
          <button>Apply to this team</button>
        </div>

        <div>
          <h2>Team Members</h2>
          <ul>
            {members}
          </ul>
        </div>

      </div>
    );
  }
});

module.exports = Team;

