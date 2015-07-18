var React = require('react');
var axios = require('axios');
// TODO: add field for potentialMax
// TODO: add record of answers

var UserQuestions = React.createClass({
  getInitialState: function() {
    return {      
      profile: {
        questionText: "",
        answers: [],
        potential: []
      },
      questionStore: [],      
      counter: this.props.counter,
      answerHistory: [],      
      ratings: {},
      testProfile2: {
        ratings: {
          dominance: 0,
          adaptable: 0,
          blunt: 0,
          collaborative: 0,
          brute: 0,
          aggressive: 0,
          troll: 0,
          loud: 0,
          committed: 0,
          ambition: 0
        }
      },
      testProfile3: {
        ratings: {
          dominance: 0,
          adaptable: 0,
          blunt: 0,
          collaborative: 0,
          brute: 0,
          aggressive: 0,
          troll: 0,
          loud: 0,
          committed: 0,
          ambition: 0
        }
      },
      testProfile4: {
        ratings: {
          dominance: 0,
          adaptable: 0,
          blunt: 0,
          collaborative: 0,
          brute: 0,
          aggressive: 0,
          troll: 0,
          loud: 0,
          committed: 0,
          ambition: 0
        }
      },
      testProfile5: {
        ratings: {
          dominance: 0,
          adaptable: 0,
          blunt: 0,
          collaborative: 0,
          brute: 0,
          aggressive: 0,
          troll: 0,
          loud: 0,
          committed: 0,
          ambition: 0
        }
      }
    };
  },
  componentDidMount: function() {
    var context = this;

    function getQuestions() {
        return axios.get('/questions');
    }

    function getRatings() {
        return axios.get('/profile');
    }

    axios.all([getQuestions(), getRatings()])
        .then(axios.spread(function(qs, profile) {         
            context.setState({
              profile: qs.data[profile.data.counter],
              questionStore: qs.data,
              counter: profile.data.counter,
              ratings: profile.data.ratings
            });
        }));
  },


  

  handleSubmit: function(e) {
    e.preventDefault();    
    var ratingUpdate = {};
    for (key in this.state.ratings) {
      ratingUpdate[key] = this.state.ratings[key];
    }
    this.state.answerHistory[this.state.counter] = e.target.answer.value;
    var targetKey = Number(e.target.answer.value);    
    for (var i = 0; i < this.state.profile.answers.length; i++) {            
      if (this.state.profile.answers[i].value === targetKey) {
        for (var x = 0; x < this.state.profile.answers[i].categories.length; x++) {
          var category = this.state.profile.answers[i].categories[x];
          var newVal = Number(this.state.ratings[category]) + Number(this.state.profile.answers[i].effects[x]);        
          ratingUpdate[category] = newVal;
        }
      }
    }    
    var count = this.state.counter + 1
    this.setState({
      ratings: ratingUpdate,
      profile: this.state.questionStore[count],      
      counter: count
    });
        
    $.post( "/ratings", { ratings: ratingUpdate, counter: count } ); //, answerHistory: this.state.answerHistory

    if (!this.state.answer) return; // check for answer
    else {


    } //TODO: send to server?
  },
  render: function() {
    return (      
      <div className="questionnaire">
        <form id="question" onSubmit={this.handleSubmit}>        
          <h2>{this.state.profile.questionText}</h2>
          <AnswersList data={this.state.profile} />       
          <br /><input type="submit" value="Submit" />
        </form>

        <QuestionHistory historyArray={this.state.answerHistory} qs={this.state.questionStore} />

        <div>
          <h1> Profiles </h1>
          <div>
          <h2>Profile 1</h2>
          <RatingList data={this.state.ratings} />
          <br />
          </div>     

          <div>
          <h2>Profile 2</h2>
          <RatingList data={this.state.testProfile2.ratings} />
          <br />
          </div>     

          <div>
          <h2>Profile 3</h2>
          <RatingList data={this.state.testProfile3.ratings} />
          <br />
          </div>

          <div>
          <h2>Profile 4</h2>
          <RatingList data={this.state.testProfile4.ratings} />
          <br />
          </div>     

          <div>
          <h2>Profile 5</h2>
          <RatingList data={this.state.testProfile5.ratings} />
          <br />
          </div>          
        </div>      

        <div>
          <h1>Matching</h1>
          Note: The overall score has the potential to be higher than the individual<br />
          scores because the maximum increases based on sample size. Individual scores<br />
          are out of 20 while overall is out of 100.
          <h2>One and Two</h2>
          <MatchList data={this.state.ratings} comp={this.state.testProfile2.ratings} />
        </div>

        <div>
          <h2>One and Three</h2>
          <MatchList data={this.state.ratings} comp={this.state.testProfile3.ratings} />
        </div>

        <div>
          <h2>One and Four</h2>
          <MatchList data={this.state.ratings} comp={this.state.testProfile4.ratings} />
        </div>

        <div>
          <h2>One and Five</h2>
          <MatchList data={this.state.ratings} comp={this.state.testProfile5.ratings} />
        </div>

        <div>
          <h2>Four and Five</h2> (more realistic sample)
          <MatchList data={this.state.testProfile4.ratings} comp={this.state.testProfile5.ratings} />
        </div>

      </div>      
      );
  }
});


var AnswersList = React.createClass({
render: function() {    
    var answerNodes = [];
    for (var i = 0; i < this.props.data.answers.length; i++) {      
      answerNodes.push(
        <div>
          <input type="radio" name="answer" value={this.props.data.answers[i].value}/> {this.props.data.answers[i].label}        
        </div>
      )    
    };
    return (
      <div className="answersList">
        {answerNodes}
      </div>
    );
  }
});

var RatingList = React.createClass({
render: function() {
    var ratingNodes = [];
    for (key in this.props.data) {
      ratingNodes.push(<li key={key}> {key} : {this.props.data[key]} </li>)
    };
    return (
      <ul className="RatingList">
        {ratingNodes}
      </ul>
    );
  }
});

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
    for (key in this.props.data) {
      var score = 20 - Math.abs(this.props.data[key] - this.props.comp[key]);
      overallScore += score;
      score = calculateMatchScore(score, 20);
      MatchNodes.push(<li key={key}> {key} : {score} </li>)
    };
    overallScore = Math.round(calculateMatchScore(overallScore, 200) * 100);


    return (
      <div>
        <ul className="MatchList">
          {MatchNodes}
        </ul>
          Overall: {overallScore}%
      </div>
    );
  }
});

var QuestionHistory = React.createClass({  
render: function() {        
    var HistoryNodes = [];

    for (var i = this.props.historyArray.length - 1; i >= 0; i--) {
          HistoryNodes.push(
        <div>
          <h3> {this.props.qs[i].questionText} </h3>
          <h4> You answered: </h4>
          <h5> {this.props.qs[i].answers[this.props.historyArray[i]].label} </h5>
        </div>
        )
    };


    return (
      <div>
        <ul className="QuestionHistory">
          {HistoryNodes}
        </ul>          
      </div>
    );
  }
});

module.exports = UserQuestions