var keymirror = require("keymirror");

/*  Link to the API */

module.exports = {

  APIEndPoints: {
    LOGIN: null,
    REGISTRATION: null,
  },

  PayLoadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keymirror({

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
