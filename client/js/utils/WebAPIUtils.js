/*
  THIS IS WHERE WE TALK TO OUR BACKEND OR
  ANY OTHER API INTERFACE.

  USING SUPER AGENT AS OUR HTTP MODULE

 */
var ServerActionCreators = require("../actions/ServerActionCreators");
var AppConstants = require("../constants/app-constants");
var request = require("superagent");


var APIEndpoints = AppConstants.APIEndPoints;


function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

module.exports = {

  signup: function (email, username, password, passwordConfirmation) {
    request.post(APIEndpoints.REGISTRATION)
      .send({
        user: {
          email: email,
          username: username,
          password: password,
          password_confirmation: passwordConfirmation
        }
      })
      .set('Accept', 'application/json')
      .end(function (error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  login: function (email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({email: email, password: password, grant_type: 'password'})
      .set('Accept', 'application/json')
      .end(function (error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  }
};
