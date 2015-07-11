var UserConstants = require('../constants/user-constants');
var Dispatcher = require('../dispatchers/dispatcher');

var UserActions = {
  signUp: function(data) {
    Dispatcher.handleViewAction({
      actionType: UserConstants.SIGN_UP,
      data: data
    })
  }
};

module.exports = UserActions;