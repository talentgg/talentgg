var React = require('react');
var axios = require('axios');

var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;

var belle = require('belle');
Button = belle.Button;

var whiteBox = {backgroundColor: 'white', padding: '25', margin:'25', border: 'solid black 2px', height: '250', width: '450', display: 'inline-block'};
var headshot = {backgroundColor: 'white', padding: '10', border: 'solid red 2px', height: '200', width: '200', float: 'left', textAlign: 'center'};
var stats = {backgroundColor: 'white', padding: '25', border: 'solid blue 2px', height: '200', width: '200', display: 'block', float: 'right', textAlign: 'center'};


var FindTeams = React.createClass({
  getInitialState: function() {
    return {
      users: [],
      me: {},      
      times: "any",
      purpose: "any",
      willdo: {
        'Tank': false,
        'Jungle': false,
        'Support': true,
        'Mid': false,
        'ADC': false,
        'Fill': true
      },
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
            context.setState({
              users: them.data,
              me: me.data.ratings,
              id: me.data.id             
            });
        }));
  },

  handleSubmit: function(e) {
    e.preventDefault();
    for (key in this.state) {
      console.log("key", key);
      console.log(this.state[key]);
    }
  },

  handleChange: function(e) {
    switch (e.target.name) {
      case "times":
        this.setState({
          times: e.target.value      
        });
        break;

      case "purpose":
        this.setState({
          purpose: e.target.value      
        });
        break;

      // case "willdo":
      //   this.setState({
      //     willdo: e.target.value
      //   });
      //   break;

      default:
        console.log(e.target.name);
        break;
    }
  },
  render: function() {

    return (     
      <div className="findTeams">
        <h1> Matches </h1>
        <h2> Filters </h2>
          <li>
              <label>Times Available:</label>
              <select className="form-control" value={this.state.times} onChange={this.handleChange} name="times">
                <option value="weekdays" defaultValue>Weekdays</option>
                <option value="weeknights">Weeknights</option>
                <option value="weekends">Weekends</option>
              </select>
          </li>
          <li>
            <label>Purpose:</label>
            <select className="form-control" value={this.state.purpose} onChange={this.handleChange}  name="purpose">
              <option value="2v2 ranked" defaultValue>2v2 Ranked</option>
              <option value="3v3 casual">3v3 Casual</option>
              <option value="5v5 casual">5v5 Casual</option>
              <option value="5v5 ranked">5v5 Ranked</option>
            </select> 
          </li>

          <form onSubmit={this.handleSubmit}>
          
            <Checkbox
            label='Will Do: '
            options={this.state.willdo}
            onChange={this.setState.bind(this)}
            bootstrap />

            <Button primary type="submit" value="Submit">Submit</Button>
          </form>

          


        <MatchList users={this.state.users} me={this.state.me} id={this.state.id} filters={this.state.filters} />    
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

    var LinkedList = function() {
      var list = {};
      list.head = null;
      list.tail = null;
      list.addToTail = function(value) {
          var newNode = new Node(value);
          newNode.previous = list.tail;
          list.tail = newNode;
          if (list.head === null) {
              list.head = newNode;
          } else {
              var current = list.head;
              while (current.next) {
                  current = current.next;
              }
              current.next = newNode;
          }
          list.counter++
      };
      
      var Node = function(value) {
          var node = {};
          node.value = value;
          node.next = null;
          node.previous = null;
          return node;
      }
    };

    var filteredUsers = new LinkedList(this.props.users[0]);
    // while () {
    //   if (this.state.times === "any" || this.state.times === this.props.users[i].bio.times) {
    //     filteredUsers.addToTail(this.props.users[i]);
    //   }
    // }


    for (var i = 0; i < this.props.users.length; i++){
      if (this.props.users[i].id !== this.props.id) {
        for (key in this.props.me) {          
          var score = 20 - Math.abs(this.props.me[key] - this.props.users[i].ratings[key]);
          overallScore += score;
          score = calculateMatchScore(score, 20);        
        };
        overallScore = Math.round(calculateMatchScore(overallScore, 200) * 100);
        MatchNodes.push(
          <div className="row" style={whiteBox}>
            <div className="row" style={headshot}>
              <img className="img-circle center-block" src={this.props.users[i].games.avatar}/>
              <div align="center"> { this.props.users[i].displayName } </div>
              <div> {overallScore}% </div>
            </div>
            <div className="row" style={stats}>
              <div> { this.props.users[i].bio.willdo } </div>
              <div> { this.props.users[i].bio.purpose } </div>    
              <div> { this.props.users[i].bio.times } </div>
              <br />
              <br />
            </div>
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


// <li className="form-group checkbox inline no_indent" value={this.state.willdo} onChange={this.handleChange} >
            
          //   <label>Will Do:</label>
          //   <label className="checkbox inline no_indent">
          //     <input type="checkbox" name="willdo" value="tank" ref="willdo" />Tank
          //   </label>  
          //   <label className="checkbox inline no_indent">
          //     <input type="checkbox" name="willdo" value="jungle" ref="willdo"/>Jungle
          //   </label>  
          //   <label className="checkbox inline no_indent">
          //     <input type="checkbox" name="willdo" value="support" ref="willdo"/>Support
          //   </label>
          //   <label className="checkbox inline no_indent"> 
          //     <input type="checkbox" name="willdo" value="mid" ref="willdo"/>Mid
          //   </label>
          //   <label className="checkbox inline no_indent">  
          //     <input type="checkbox" name="willdo" value="adc" ref="willdo"/>ADC
          //   </label>
          //   <label className="checkbox inline no_indent">  
          //     <input type="checkbox" name="willdo" value="fill" ref="willdo"/>Fill
          //   </label>

          // </li>
