var React = require('react');

var Questions = React.createClass({
  getInitialState: function() {
    return {
     placeholder: null  // temp
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
          <h2> Placeholder text. This should pull questions and answers from the server. </h2>
          <br /><input type="radio" name="temp" value="+=10" />dominant answer?
          <br /><input type="radio" name="temp" value="+=0" />adaptable answer?
          <br /><input type="radio" name="temp" value="-=10" />passive answer?
          <br /><input type="submit" value="submit" />
        </form>
      </div>      
      );
  }
});

module.exports = Questions