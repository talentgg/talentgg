/*
  * OUR DISPATCHER HANDLES TWO TYPES OF REQUESTS. VIEWACTION REQUESTS WHICH ARE TRIGGERED BY OUR
  * COMPONENTS. AND SERVER REQUESTS WHICH SHOULD BE TRIGGERED WITHIN OUR WEB API UTILITY
  * BUT CAN ALSO BE TRIGGERED FROM A VIEW. THAT WOULD BE A ANTI-PATTERN SO WE SHOULD TRY TO
  * AVOID THAT.
  *
  * IT THEN TAKES THAT ACTION'S PAYLOAD, CREATES A NEW OBJECT & DISPATCHES THE PAYLOAD TO ANY STORE
  * THAT HAS IT REGISTERED.
  *
  * */



var AppConstants = require("../constants/app-constants");
var Dispatcher = require("flux").Dispatcher;
var assign = require("object-assign");

var PayLoadSources = AppConstants.PayLoadSources;

var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: PayLoadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayLoadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;