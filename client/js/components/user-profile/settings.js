var React = require('react');
var Router = require('react-router');

var Settings = React.createClass({

  mixins: [Router.State, Router.Navigation],

  propTypes: {
    displayName: React.PropTypes.string.isRequired,
  },

  handleSubmit: function() {  
    var router = this.context.router;
    setTimeout(function() {
      router.transitionTo('profile', {username: 'username'});
    }, 100);
  },

  render: function(){
    //I want to get rid of the container divs, need to implement them in the template
    return(
      <div className="container">
      <form className="form-horizontal" method="POST" action="/settings">
        <div className="form-group">
          <label className="col-sm-2 control-label">Display Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="displayName" value={this.props.displayName} onChange={this.handleChange} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button onClick={this.handleSubmit} className="btn btn-default>">Update</button>
          </div>
        </div>
      </form>
      </div>
    )
  }
})

module.exports = Settings;
