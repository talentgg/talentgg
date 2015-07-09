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
      name: this.refs.name.getDOMNode().value,
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value
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
  signUp: function(data) {
    // todo: send payload to server or action
    $.post(./server/routes/user, function(data) {

    });
  },
  render: function() {
    return (
      <Form />
    );
  }
});

module.exports = Registration;