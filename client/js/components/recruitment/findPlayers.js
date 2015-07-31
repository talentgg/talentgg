var React = require('react');
var axios = require('axios');
var _ = require('lodash');
var MatchList = require('./matchList.js');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;

var belle = require('belle');
Button = belle.Button;
Select = belle.Select;
Option = belle.Option;
Separator = belle.Separator;

var rd3 = require('react-d3');
var LineChart = rd3.LineChart;

var RecUtil = require('../../utils/recUtil.js');


var FindPlayers = React.createClass({
  getInitialState: function() {
    return {
      allUsers: [],
      teamIDs: [],
      myTeams: [],
      allTeams: [],
      filteredUsers: [],
      me: {},
      displayName: "solo",
      times: {
        "weekdays": false,
        "weeknights": false,
        "weekends": false
      },
      purpose: {
        "Casual": false,
        "Ranked": false,
        "3v3": false,
        "5v5": false
      },
      lanes: {
        "top": false,
        "mid": false,
        "bot": false,
        "jungle": false
      },
      roles: {
        "assassin": false,
        "mage": false,
        "marksman": false,
        "bruiser": false,
        "support": false,
        "tank": false
      },
      id: 0,
      searchAs: "solo"
    };
 },
  componentWillMount: function() {
    var context = this;

    axios.all([axios.get('/user/all'), axios.get('/profile'), axios.get('/profile/teams'), axios.get('/team/all')])
        .then(axios.spread(function(them, me, myTeams, allTeams) {
            context.setState({
              allUsers: them.data,
              filteredUsers: them.data,
              me: me.data.ratings,
              id: me.data.id,
              myTeams: myTeams.data,
              displayName: me.data.displayName,
              allTeams: allTeams.data
            });
        }));
  },

  handleChange: function(e) {
    this.setState({
      searchAs: e.value
    });
  },
  render: function() {
    var context = this;
    var teamsCaptained = RecUtil.teamsCaptained(context.state.myTeams, context.state.id);

    return (
      <div className="findPlayers">

          <form onSubmit={this.handleSubmit}>

            <Select onUpdate={this.handleChange} >
              <Option value="solo">search individuals as myself</Option>
              <Option value="team">search teams as myself</Option>
              <Separator>Teams You Captain</Separator>
              {teamsCaptained}
            </Select>

            <Checkbox
            label='Times: '
            options={this.state.times}
            onChange={this.setState.bind(this)}
            bootstrap />

            <Checkbox
            label='Purpose: '
            options={this.state.purpose}
            onChange={this.setState.bind(this)}
            bootstrap />

            <Checkbox
            label='Roles: '
            options={this.state.roles}
            onChange={this.setState.bind(this)}
            bootstrap />

            <Checkbox
            label='Lanes: '
            options={this.state.lanes}
            onChange={this.setState.bind(this)}
            bootstrap />

          </form>

        <MatchList allUsers={this.state.allUsers} allTeams={this.state.allTeams} me={this.state.me}
        id={this.state.id} searchAs={this.state.searchAs} times={this.state.times} purpose={this.state.purpose}
        roles={this.state.roles} lanes={this.state.lanes} />
      </div>
      );
  }
});


module.exports = FindPlayers;
