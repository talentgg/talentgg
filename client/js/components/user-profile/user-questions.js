var React = require('react');
var axios = require('axios');
// TODO: add field for potentialMax
// TODO: add record of answers

var UserQuestions = React.createClass({
  getInitialState: function() {
    return {      
      current: {
        questionText: "",
        answers: [],
        potential: []
      },
      questionStore: [],      
      counter: this.props.counter,
      answerHistory: [],      
      ratings: {},      
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
              current: qs.data[profile.data.counter],
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
    for (var i = 0; i < this.state.current.answers.length; i++) {            
      if (this.state.current.answers[i].value === targetKey) {
        for (var x = 0; x < this.state.current.answers[i].categories.length; x++) {
          var category = this.state.current.answers[i].categories[x];
          var newVal = Number(this.state.ratings[category]) + Number(this.state.current.answers[i].effects[x]);        
          ratingUpdate[category] = newVal;
        }
      }
    }    
    var count = this.state.counter + 1
    this.setState({
      ratings: ratingUpdate,
      current: this.state.questionStore[count],      
      counter: count
    });
        
    $.post( "/ratings", { ratings: ratingUpdate, counter: count } );
  },
  render: function() {
    return (      
      <div className="questionnaire">
        <form id="question" onSubmit={this.handleSubmit}>        
          <h2>{this.state.current.questionText}</h2>
          <AnswersList data={this.state.current} />       
          <br /><input type="submit" value="Submit" />
        </form>
        <QuestionHistory historyArray={this.state.answerHistory} qs={this.state.questionStore} />        
      </div>      
      );
  }
});

var AnswersList = React.createClass({
render: function() {
    console.log("answerlist");
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