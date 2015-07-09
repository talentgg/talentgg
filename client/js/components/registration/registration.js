var React = require('react');

<<<<<<< HEAD
var fieldValues = {
  name: null,
  email: null,
  password: null
}

var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var data = {
      name: this.refs.name.getDOMENode().value,
      email: this.refs.email.getDOMENode().value,
      password: this.refs.password.getDOMENode().value
    }
    
    this.props.signUp(data);
    
=======
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

>>>>>>> 2e31246a2526a096bbb04343395bbe07a63bdf37
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
<<<<<<< HEAD
        <li>
          <label>Name</label>
            <input placeholder="name" ref="name" />
        </li>
        <li>
          <label>Email</label>
            <input placeholder="enter email" ref="email" />
        </li>
        <li>
          <label>Password</label>
            <input placeholder="enter password" ref="password" />
        </li>
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
    // todo: send payload to server or action
  },
  render: function() {
    return (
      <Form />
=======
        <label>Name</label>
          <input placeholder="name" ref="name" />

        <label>Password</label>
          <input placeholder="enter password" ref="password" />

        <label>Email</label>
          <input placeholder="enter email" ref="email" />

        <button>Register</button>
      </form>
>>>>>>> 2e31246a2526a096bbb04343395bbe07a63bdf37
    );
  }
});

<<<<<<< HEAD
=======
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

>>>>>>> 2e31246a2526a096bbb04343395bbe07a63bdf37
module.exports = Registration;