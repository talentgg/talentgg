var React = require('react');
var Router = require("react-router");

var Chart = React.createClass({
  propTypes: {
    ratings: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {
      ratings: {
        dominance: 0,
        adaptable: 0,
        blunt: 0,
        collaborative: 0,
        brute: 0,
        aggressive: 0,
        boundaries: 0,
        loud: 0,
        committed: 0,
        ambition: 0
      }
    }
  },
  componentWillReceiveProps: function(props){
    this.setState({
      ratings: props.ratings
    })
  },
  render: function(){
    return(
      <div className="panel panel-default whitebox">
        <div className="panel-body">
          <Bar ratings={this.state.ratings} />
        </div>
      </div>
    )
  }
})

var Bar = React.createClass({
  render: function(){
    var ratings = this.props.ratings;
    var chartList = [];
    for(var key in ratings){
      if(ratings[key] > 0){
        chartList.push(
          <div key={key} className="row">
            <div className="col-sm-6">
              <p className="pull-right">Your {key} is high</p>
            </div>
            <div className="col-sm-6">
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: ratings[key] + '%'}}>
                </div>
              </div>
            </div>
          </div>
        )
      } else if(ratings[key] < 0) {
        chartList.push(
          <div key={key} className="row">
            <div className="col-sm-6">
              <div className="progress">
                <div className="progress-bar progress-bar-right" role="progressbar" style={{width: ratings[key]*-1  + '%'}}>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <p>Your {key} is low</p>
            </div>
          </div>
        )
      } else {
        chartList.push(
          <div key={key} className="row">
            <p className="text-center">Your {key} is untested</p>
          </div>
        )
      }
    }
    return(
      <div>
        {chartList}
      </div>
    )
  }
})

module.exports = Chart;
