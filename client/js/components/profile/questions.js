var Signup = React.createClass({
  getInitialState: function() {
    return {
      count: 0,
      username: '',
      about: '',
      style: '',
      lookingFor: '',
      questionnaire1: null
    }
  },
  handleSubmit: function(e) {
//   console.log(e);
    e.preventDefault();
    this.state.username  = React.findDOMNode(this.refs.username).value.trim();
//     if (!this.state.username) return;
    this.state.count++;
    // TODO: check username against server
    // if ok,
    React.render(<Signup />, document.getElementById('app'));
  },
  render: function() {
    switch (this.state.count) {
    
    case 0:
      return (
        <form id="questionnaire1" onSubmit={this.handleSubmit}>
          <h2>username</h2>
          <input type="text" ref="username" placeholder="KoolDood88" ref="username" />
          <input type="submit" value="submit" />
        </form>
    );
      break;
    
    case 1:
      return (
        <form id="questionnaire1" onSubmit={this.handleSubmit}>
          <h2>username</h2>
          <input type="text" placeholder="DroolDood88" ref="username" />
          <input type="submit" value="submit" />
        </form>
      );
      break;
  
    case 2: 
      return (
        <form>
        <h2>How would you describe your playing style?</h2>
        <input type="text" placeholder="kool" ref="style" />
        <input type="submit" value="submit" />
      </form>
      );
      break;

    case 3:
      return (
        <form>
          <h2>What are you looking for?</h2>
          <h3>A new team? A new teammate for an existing team? What kind of player?</h3>
          <input type="text" placeholder="kool doodz" ref="lookingFor" />
          <input type="submit" value="submit" />
        </form>
      );
      break;
   
    case 4:
      return (
      <form>
      <h2>Lastly, here is an example question to start building your profile.
      Answer more later to get better matches!</h2>
      <br>
      <form id="questionnaire1" onSubmit={this.handleSubmit}>
        <div class="questionnaire">
          <h2>Placeholder text. This question is intended to gauge your propensity to dominate socially.</h2>          
          <input type="radio" value="+=10" />dominant answer
          <input type="radio" value="+=0" />adaptable answer
          <input type="radio" value="-=10" />passive answer
        </div>      
      </form>
      );
      break;
  
    default:
      console.log("wut");
    }
}
});

React.render(<Signup />, document.getElementById('app'));
