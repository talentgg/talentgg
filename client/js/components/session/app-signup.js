/* OUR SIGNUP VIEW THAT TRIGGERS OUR SESSIONACTIONS
 * WE ALSO RECIEVE OUR STATE FROM THE SESSIONSTORE */


var React = require('react');
var SessionActions = require('../../actions/SessionActionCreators');
var SessionStore = require('../../stores/SessionStore');
var Error = require("../error/app-error");

var SignupPage = React.createClass({

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

    var data = {
      username: this.refs.username.getDOMNode().value,
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value,
      confirm: this.refs.confirm.getDOMNode().value
    }


    console.log(data);
    SessionActions.signup(data);

  },
  render: function() {
    var errors = (this.state.errors.length > 0) ? <Error errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        <form method="POST" action="/register">
          <li>
            <label>Email</label>
            <input name="username" placeholder="enter email" ref="email" />
          </li>
          <li>
            <label>Password</label>
            <input name="password" placeholder="enter password" ref="password" />
          </li>
          <button>Register</button>
        </form>
      </div>
    );
  }
});

module.exports = SignupPage;
