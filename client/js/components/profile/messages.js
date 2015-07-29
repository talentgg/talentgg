var React = require('react/addons');
var Router = require('react-router');

var Messages = React.createClass({
  propTypes: {
    messages: React.PropTypes.array.isRequired
  },
  getInitialState: function(){
    return {
      messages: this.props.messages
    };
  },
  componentWillReceiveProps: function(props){
    this.setState({
      ratings: props.messages
    })
  },

  render: function(){
    var messageList = this.state.messages.map(function(val, i){
      return(
        <div className="col-sm-12" key={i}>
          <div className="panel panel-default whitebox">
            <div className="panel-body">
              <p><b>{val.displayName}</b><span className="pull-right">{dateConvert(val.time)}</span></p>
              <p>{val.contents}</p>
            </div>
          </div>
          <br/>
        </div>
      )
    })
    return(
      <div className="row">
        {messageList.reverse()}
      </div>
    )
  }
})

var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function dateConvert(t){
  t = new Date(t);
  var am = ' AM'
  var min = '0' + t.getMinutes();
  var hour = t.getHours();
  var date = t.getDate();
  var mon = t.getMonth();
  if(hour > 12){
    hour -= 12;
    am = ' PM'
  }
  return months[mon] + ' ' + date + ', ' + hour + ':' + min.substr(-2) + am;
}

module.exports = Messages;
