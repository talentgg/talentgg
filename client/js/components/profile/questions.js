/*
var React = require('react');

var UserQuestions = React.createClass({
  getInitialState: function() {
    return {
      testData: {
          questionText: "Does this work",
          answersText: ["yes", "no"],
          answersEffect: [["competence", "+=10"], ["competence", "-=10"]]  //it might be easier to have the answer and effect wrapped  in one tuple

      }
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (!this.state.answer) return; // check for answer
    else {} //TODO: send to server?
  },
  render: function() {
  
      return (      
      <div className="questionnaire">
        <form id="question" onSubmit={this.handleSubmit}>        
          <h2>{this.state.testData.questionText}</h2>
          <AnswersList data={this.state.testData} />       
          <br /><input type="submit" value="submit" />
        </form>
      </div>      
      );
  }
});


var AnswersList = React.createClass({
render: function() {
    var answerNodes = this.props.data.answersText.map(function (answer) {
      return (
        <input type="radio" name="temp"> {answer}        
      );
    });
    return (
      <div className="answersList">
        {answerNodes}
      </div>
    );
  }
});

module.exports = UserQuestions;


         /!* // <br /><input type="radio" name="temp" value="+=10" />dominant answer?
          // <br /><input type="radio" name="temp" value="+=0" />adaptable answer?
          // <br /><input type="radio" name="temp" value="-=10" />passive answer?*!/*/
