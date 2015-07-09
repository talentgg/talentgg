var React = require('react');

var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var userName = React.findDOMNode(this.refs.name);
    var userPassword = React.findDOMNode(this.refs.password);
    var userEmail = React.findDOMNode(this.refs.email);
    this.props.signUp(this.props);
    userName.value = '';
    userPassword.value = '';
    userEmail.value = '';

  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
          <input placeholder="name" ref="name" />

        <label>Password</label>
          <input placeholder="enter password" ref="password" />

        <label>Email</label>
          <input placeholder="enter email" ref="email" />

        <button>Register</button>
      </form>
    );
  }
});

var Registration = React.createClass({
  getInitialState: function() {
    return {};
  },
  signUp: function() {

  },
  render: function() {
    return (
      <Form />
    );
  }
});

module.exports = Registration;