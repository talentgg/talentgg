module.exports = {
  port: process.env.PORT || 3000, // the server port
  psql: process.env.PSQL || 'postgres://localhost:5432/talentgg',
  lolapi: process.env.RIOTAPI || require( './private' ).api,
  autoauth: true
};
