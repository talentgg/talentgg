var React = require('react');
var axios = require('axios');

var FindTeams = React.createClass({
  getInitialState: function() {
    return {
      users: [],
      me: {},
      filters: [],
      id: 0
    };
  },
  componentWillMount: function() {
    var context = this;

    function getThem() {
        return axios.get('/user/all');
    }

    function getMe() {
        return axios.get('/profile');
    }

    axios.all([getThem(), getMe()])
        .then(axios.spread(function(them, me) { 
            console.log("-------");
            console.log(them.data);
            console.log("-------");
            context.setState({
              users: them.data,
              me: me.data.ratings,
              id: me.data.id             
            });
        }));
  },     

  handleSubmit: function(e) {

  },
  render: function() {
    return (      
      <div className="findTeams">
        <p> I WORK! </p>

        <h1> Matches </h1>
        <MatchList users={this.state.users} me={this.state.me} id={this.state.id} />    
      </div>
      );
  }
});

module.exports = FindTeams

var MatchList = React.createClass({  
  render: function() {
    var calculateMatchScore =  function(pos, n) {
      var z, phat;      
      z = 1.96;
      phat = 1 * pos / n;
      return (phat + z*z/(2*n) - z * Math.sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n); 
    };
    var MatchNodes = [];
    var overallScore = 0;
    for (var i = 0; i < this.props.users.length; i++){
      if (this.props.users[i].id !== this.props.id) {
        for (key in this.props.me) {
          console.log("xxxxxxxx", i)
          console.log(key);
          console.log(this.props.me[key])
          console.log(this.props.users[i].ratings[key])
          console.log("xxxxxxxx", i)
          var score = 20 - Math.abs(this.props.me[key] - this.props.users[i].ratings[key]);
          overallScore += score;
          score = calculateMatchScore(score, 20);        
        };
        overallScore = Math.round(calculateMatchScore(overallScore, 200) * 100);
        MatchNodes.push(
          <div>
            <div> { this.props.users[i].displayName } </div>
            <div> { this.props.users[i].bio.willdo } </div>
            <div> { this.props.users[i].bio.purpose } </div>    
            <div> { this.props.users[i].bio.times } </div>
            <div> {overallScore}% </div>
            <br />
            <br />
          </div>)
        }
      }


    return (
      <div>
        <ul className="MatchList">
          {MatchNodes}
        </ul>          
      </div>
    );
  }
});
