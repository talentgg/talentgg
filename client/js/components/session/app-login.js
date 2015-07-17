/* OUR LOGIN VIEW THAT TRIGGERS OUR SESSIONACTIONS
 * WE ALSO RECIEVE OUR STATE FROM THE SESSIONSTORE */



var React = require('react');
var Router = require('react-router');

var LoginPage = React.createClass({
  mixins: [Router.State, Router.Navigation],
  getInitialState: function() {
    return { errors: [] };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    
    // var username = this.refs.username.getDOMNode().value;
    // var password = this.refs.password.getDOMNode().value;

    var router = this.context.router;
    // var username = this.getParams().username;
    router.transitionTo('user-profile', {username: 'username'});
    
  },

  render: function() {
    return (
      <div>
        <form method="POST" action="/login">

          <label name="username">Usernamel</label>
          <input type="text" name="username" ref="username" />

          <label name="password">Password</label>
          <input type="password" name="password" ref="password"/>

          <button onClick={handleSubmit}>Submit</button>

          </form>
      </div>
    )
  }
});

module.exports = LoginPage;
