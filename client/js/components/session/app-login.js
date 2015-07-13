/* OUR LOGIN VIEW THAT TRIGGERS OUR SESSIONACTIONS
 * WE ALSO RECIEVE OUR STATE FROM THE SESSIONSTORE */



var React = require('react');
var SessionActionCreators = require("../../actions/SessionActionCreators");
var SessionStore = require('../../stores/SessionStore');

var LoginPage = React.createClass({
  getInitialState: function() {
    return { errors: [] };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;

    console.log({username: username, password: password});
    SessionActionCreators.login(username, password);
  },

  render: function() {
    return (
      <div>
        <form method="POST" action="/login">

          <label name="username">Usernamel</label>
          <input type="text" name="username" ref="username" />

          <label name="password">Password</label>
          <input type="password" name="password" ref="password"/>

          <button type="submit">Submit</button>

          </form>
      </div>
    )
  }
});

module.exports = LoginPage;
