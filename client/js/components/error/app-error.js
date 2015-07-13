/* VIEW FOR ERRORS ENCOUNTERED AT THE LOGIN OR SIGNUP PAGE
   WE CAN ALSO RENDER THIS VIEW WHENEVER WE ENCOUNTER ERRORS
   THROUGHOUT THE APP
 */


var React = require('react');

var Error = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          {this.props.errors.map(function(error, index){
            return <li key={"error-"+index}>{error}</li>;
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Error;