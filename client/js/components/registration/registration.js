var React = require('react');

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
    
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
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
    );
  }
});

module.exports = Registration;