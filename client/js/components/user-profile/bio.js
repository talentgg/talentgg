var React = require('react');
var Axios = require('axios');

var Bio = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    bio: React.PropTypes.array.isRequired
  },

  componentDidMount: function() {
    Axios.get('/user')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        console.log(response);
      });
  },

  componentWillUnmount: function() {
    
  },

  handleEdit: function() {
    
  },

  render: function() {
    var items = this.props.bio.map(function(item, index) {
      return <li className="list-group-item" key={index}> {item} </li>
    });
    return (
      <div>
      <ul className="list-group">
        {items}
      </ul>
      <button>Joe Budden</button>
      </div>
    )
  }
});

module.exports = Bio;

      // <div>
      //   <h2>User info:</h2>
      //   <p>Username: Da Vinci {this.props.username}</p>
      //   <p>bio: Team Medici {this.props.bio}</p>
      // </div>