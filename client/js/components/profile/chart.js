var React = require('react');
var Router = require("react-router");

var Chart = React.createClass({
  propTypes: {
    ratings: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {
      ratings: this.props.ratings,
      descriptors: {
        dominance: ['more dominant', 'more empathetic', 'dominance'],
        adaptable: ['more adaptable', 'more particular', 'adaptability'],
        blunt: ['more blunt', 'more reticent', 'communicator'],
        collaborative: ['more collaborative', 'more individualist', 'collaborator'],
        brute: ['more brutal', 'more technical', 'playing style'],
        aggressive: ['more aggressive', 'more cautious', 'playing aggression'],
        boundaries: ['pushes boundaries', 'more respectful', 'social style'],
        loud: ['more vocal', 'more quiet', 'volume'],
        committed: ['more committed', 'more casual', 'commitment'],
        ambition: ['more ambitious', 'more fun-driven', 'ambition'],
      }
    };
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
          <Bar ratings={this.state.ratings} descriptors={this.state.descriptors} />
        </div>
      </div>
    )
  }
})

var Bar = React.createClass({

  render: function(){
    var ratings = this.props.ratings;
    var descriptors = this.props.descriptors;


    var chartList = [];
    for(var key in ratings){
      if(ratings[key] > 0){
        chartList.push(
          <div key={key} className="row">
            <div className="col-sm-6">
              <p className="pull-right">{descriptors[key][0]}</p>
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
              <p>{descriptors[key][1]}</p>
            </div>
          </div>
        )
      } else {
        chartList.push(
          <div key={key} className="row">
            <p className="text-center">neutral {descriptors[key][2]}</p>
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
