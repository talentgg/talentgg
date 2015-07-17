var React = require('react');
var axios = require('axios');
// TODO: add field for potentialMax
// TODO: add record of answers

var UserQuestions = React.createClass({
  getInitialState: function() {
    return {
      // testData: {
      // // 1: {
      //   questionText: "How do you want to change testprofile1?",
      //   answers: [{label: "add 10 to attribute1", value: 1, effects: [10], categories: ["attribute1"]},
      //   {label: "subtract 10 from attribute1", value: 2, effects: [-10], categories: ["attribute1"]},
      //   {label: "change attribute2 -10", value: 3, effects: [-10], categories: ["attribute2"]},
      //   {label: "change attribute5 -5 and attribute3 -7", value: 4, effects: [-5, -7], categories: ["attribute5", "attribute3"]}],
      //   potential: []
      // },
      testData: {
        questionText: "",
        answers: [],
        potential: []
      },
      questionStore: [],      
      counter: 0,
      answerHistory: [],      
      attributes: {
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
      },
      testProfile2: {
        attributes: {
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
        attributes: {
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
        attributes: {
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
        attributes: {
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
    axios.get('/questions').
      then(function(response) {
        context.setState({
          testData: response.data[context.state.counter],
          questionStore: response.data     
        });
      });     
  },
  

  handleSubmit: function(e) {
    e.preventDefault();    
    var attributeUpdate = {};
    for (key in this.state.attributes) {
      attributeUpdate[key] = this.state.attributes[key];
    }
    this.state.answerHistory[this.state.counter] = e.target.answer.value;
    var targetKey = Number(e.target.answer.value);    
    for (var i = 0; i < this.state.testData.answers.length; i++) {            
      if (this.state.testData.answers[i].value === targetKey) {
        for (var x = 0; x < this.state.testData.answers[i].categories.length; x++) {
          var category = this.state.testData.answers[i].categories[x];
          var newVal = Number(this.state.attributes[category]) + Number(this.state.testData.answers[i].effects[x]);        
          attributeUpdate[category] = newVal;
        }
      }
    }    
    this.setState({
      attributes: attributeUpdate,
      testData: this.state.questionStore[this.state.counter + 1],
      counter: this.state.counter + 1      
    });    
    if (!this.state.answer) return; // check for answer
    else {


    } //TODO: send to server?
  },
  render: function() {
    return (      
      <div className="questionnaire">
        <form id="question" onSubmit={this.handleSubmit}>        
          <h2>{this.state.testData.questionText}</h2>
          <AnswersList data={this.state.testData} />       
          <br /><input type="submit" value="Submit" />
        </form>

        <QuestionHistory historyArray={this.state.answerHistory} qs={this.state.questionStore} />

        <div>
          <h1> Profiles </h1>
          <div>
          <h2>Profile 1</h2>
          <RatingList data={this.state.attributes} />
          <br />
          </div>     

          <div>
          <h2>Profile 2</h2>
          <RatingList data={this.state.testProfile2.attributes} />
          <br />
          </div>     

          <div>
          <h2>Profile 3</h2>
          <RatingList data={this.state.testProfile3.attributes} />
          <br />
          </div>

          <div>
          <h2>Profile 4</h2>
          <RatingList data={this.state.testProfile4.attributes} />
          <br />
          </div>     

          <div>
          <h2>Profile 5</h2>
          <RatingList data={this.state.testProfile5.attributes} />
          <br />
          </div>          
        </div>      

        <div>
          <h1>Matching</h1>
          Note: The overall score has the potential to be higher than the individual<br />
          scores because the maximum increases based on sample size. Individual scores<br />
          are out of 20 while overall is out of 100.
          <h2>One and Two</h2>
          <MatchList data={this.state.attributes} comp={this.state.testProfile2.attributes} />
        </div>

        <div>
          <h2>One and Three</h2>
          <MatchList data={this.state.attributes} comp={this.state.testProfile3.attributes} />
        </div>

        <div>
          <h2>One and Four</h2>
          <MatchList data={this.state.attributes} comp={this.state.testProfile4.attributes} />
        </div>

        <div>
          <h2>One and Five</h2>
          <MatchList data={this.state.attributes} comp={this.state.testProfile5.attributes} />
        </div>

        <div>
          <h2>Four and Five</h2> (more realistic sample)
          <MatchList data={this.state.testProfile4.attributes} comp={this.state.testProfile5.attributes} />
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