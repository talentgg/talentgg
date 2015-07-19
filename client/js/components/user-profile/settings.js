var React = require('react');
var Router = require('react-router');

var leagueAccount;

var leagueUpdate = function(){
  if(true){
    leagueAccount = <form>
      <span>True</span>
    </form>;
  } else {
    this.leagueAccount = <form>
      <span>False</span>
    </form>;
  }
}

var Settings = React.createClass({

  getInitialState: function(){
    return {
      displayName: ""
    }
  },

  componentDidMount: function(){
    $.get('/profile', function(result){
      console.log(result);
      if(this.isMounted()){
        this.setState({
          displayName: result.displayName
        })
      }
      leagueUpdate();
    }.bind(this));
  },

  handleChange: function(e){
    this.setState({
      displayName: e.target.value
    });
  },

  render: function(){
    return(
      <form className="form-horizontal" method="POST" action="/settings">
        <div className="form-group">
          <label className="col-sm-2 control-label">Display Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="displayName" value={this.state.displayName} onChange={this.handleChange} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default>">Update</button>
          </div>
        </div>
      </form>
    )
  }
});

module.exports = Settings;
