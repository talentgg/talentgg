/* HANDLES ACTIONS THAT DEAL WITH SERVER REQUESTS
 * RECEIVE LOGIN IS CALLED & TRIGGERED FROM WITHIN OUR
 * WEB API UTILITY. THIS IS THEN DISPATCHED TO THE SESSIONSTORE
 * WITH THE PAYLOAD
 *
 * */


var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");

var ActionTypes = AppConstants.ActionTypes;


module.exports = {

  recieveLogin: function(json, errors) {
    AppDispatcher.handleServerAction({
      actionType: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  }

};
