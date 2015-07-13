/* OUR ACTION CONSTANTS ARE CONTAINED WITHIN THIS FILE
 * WHENEVER WE WANT TO CREATE A NEW ACTION, WE MUST FIRST CREATE A CONSTANT FOR THAT ACTION */


var keyMirror = require('keymirror');

var APIRoot = "http://localhost:8000";

module.exports = {

  APIEndPoints: {
    LOGIN: APIRoot + '/login',
    REGISTRATION: APIRoot + '/signup'
  },

  PayLoadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({

    // Session

    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    // ROUTES

    REDIRECT: null,

    // OTHER EXAMPLES

    LOAD_USER_STATS: null,
    LOAD_TEAM_STATS: null

  })
};
