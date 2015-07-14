var React = require('react');

var UserQuestions = React.createClass({
  getInitialState: function() {
    return {
      testData: {
        questionText: "How do you want to change testprofile1?",
        answers: [{label: "add 10 to attribute1", value: 1, effects: [10], categories: ["attribute1"]},
        {label: "subtract 10 from attribute1", value: 2, effects: [-10], categories: ["attribute1"]},
        {label: "change attribute2 -10", value: 3, effects: [-10], categories: ["attribute2"]},
        {label: "change attribute5 -5 and attribute3 -7", value: 4, effects: [-5, -7], categories: ["attribute5", "attribute3"]}]
      },
      testProfile1: {
        attribute1: 0,
        attribute2: 10,
        attribute3: 10,
        attribute4: 10,
        attribute5: 10
      },
      testProfile2: {
        attribute1: 10,
        attribute2: 10,
        attribute3: 10,
        attribute4: 10,
        attribute5: 10
      },
      testProfile3: {
        attribute1: -10,
        attribute2: -10,
        attribute3: -10,
        attribute4: -10,
        attribute5: -10
      },
      testProfile4: {
        attribute1: 4,
        attribute2: -3,
        attribute3: 1,
        attribute4: 8,
        attribute5: -5
      },
      testProfile5: {
        attribute1: 2,
        attribute2: -9,
        attribute3: 4,
        attribute4: 6,
        attribute5: -6
      }
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();    
    var newProfile = {};
    for (key in this.state.testProfile1) {
      newProfile[key] = this.state.testProfile1[key];
    }
    var targetKey = Number(e.target.answer.value);    
    for (var i = 0; i < this.state.testData.answers.length; i++) {      
      
      if (this.state.testData.answers[i].value === targetKey) {
        for (var x = 0; x < this.state.testData.answers[i].categories.length; x++) {
          var category = this.state.testData.answers[i].categories[x];
          var newVal = Number(this.state.testProfile1[category]) + Number(this.state.testData.answers[i].effects[x]);        
          newProfile[category] = newVal;
        }
      }
    }
    this.setState({
      testProfile1: newProfile
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



        <div>
          <h1> Profiles </h1>
          <div>
          <h2>Profile 1</h2>
          <RatingList data={this.state.testProfile1} />
          <br />
          </div>     

          <div>
          <h2>Profile 2</h2>
          <RatingList data={this.state.testProfile2} />
          <br />
          </div>     

          <div>
          <h2>Profile 3</h2>
          <RatingList data={this.state.testProfile3} />
          <br />
          </div>

          <div>
          <h2>Profile 4</h2>
          <RatingList data={this.state.testProfile4} />
          <br />
          </div>     

          <div>
          <h2>Profile 5</h2>
          <RatingList data={this.state.testProfile5} />
          <br />
          </div>          
        </div>      

        <div>
          <h1>Matching</h1>
          Note: The overall score has the potential to be higher than the individual<br />
          scores because the maximum increases based on sample size. Individual scores<br />
          are out of 20 while overall is out of 100.
          <h2>One and Two</h2>
          <MatchList data={this.state.testProfile1} comp={this.state.testProfile2} />
        </div>

        <div>
          <h2>One and Three</h2>
          <MatchList data={this.state.testProfile1} comp={this.state.testProfile3} />
        </div>

        <div>
          <h2>One and Four</h2>
          <MatchList data={this.state.testProfile1} comp={this.state.testProfile4} />
        </div>

        <div>
          <h2>One and Five</h2>
          <MatchList data={this.state.testProfile1} comp={this.state.testProfile5} />
        </div>

        <div>
          <h2>Four and Five</h2> (more realistic sample)
          <MatchList data={this.state.testProfile4} comp={this.state.testProfile5} />
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
    overallScore = Math.round(calculateMatchScore(overallScore, 100) * 100);


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

module.exports = UserQuestions