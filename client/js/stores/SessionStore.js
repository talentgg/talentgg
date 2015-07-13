var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");


var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = "change";

// loading an access token from session storage
// would need to implement a remember me with localStorage

var _accessToken = sessionStorage.getItem('accessToken');
var _email = sessionStorage.getItem('email');
var _erros = [];

var SessionStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function () {
    return _accessToken ? true : false;
  },

  getAccessToken: function () {
    return _accessToken;
  },

  getEmail: function() {
    return _email;
  },

  getErrors: function () {
    return _errors;
  }
});


SessionStore.dispatchToken = AppDispatcher.register(function (payload) {

  var action = payload.action;

  switch (action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      if (action.json && action.json.access_token) {

        // sets token in storage so it can be available locally. our API can grab it

        _accessToken = action.json.access_token;
        sessionStorage.addItem('accessToken', _accessToken);
        sessionStorage.addItem('email', _email);

      }
      if (action.errors) {
        _erros = action.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _email = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('email');
      SessionStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = SessionStore;



/* SESSION STORE WILL MANAGE THE STATE OF OUR AUTH.
   LOGIN RESPONSE CREATES AN ACCESS TOKEN IF ONE EXISTS.
   AND WILL SAVE IT IN sessionStorage.

   WE WILL HAVE TO MAKE CHANGES WHEN WE GET OUR WEBAPI UTIL SETUP
   WITH OUR BACKEND
 */



