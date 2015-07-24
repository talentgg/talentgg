var User = require('../controllers/user.controller.js');
var passport = require('passport');

module.exports = function(app) {

  // User API routes

  app.post('/register', function(req, res, next) { // Registers new users and persists on psql
    User.register(req, res, next);
  });

  app.post('/login', passport.authenticate('local'), function(req, res) { // Logs in users
    res.redirect('/');
  });

  app.post('/logout', function(req, res, next) { // Logs out users
    User.logout(req, res, next);
  });

  // TODO: Create a route for updating email/displayName

  app.get('/profile', function(req, res){ // Personal account data
    User.getOwnProfile(req, res);
  });

  app.post('/profile', function(req, res){ // Update bio data
    User.updateBio(req, res);
  });

  app.post('/ratings', function(req, res){ // Update ratings
    User.updateRatings(req, res);
  });

  app.post('/settings', function(req, res){ // Update account information
    if(req.body.pass1 === req.body.pass2){
      User.updateSettings(req, res);
    } else {
      res.send('Your password and confirmation password did not match, please try again.');
    }
  });

  app.post('/setSummoner', function(req, res){ // Update summoner information
    User.setSummoner(req, res);
  });

  app.post('/verifySummoner', function(req, res){
    User.verifySummoner(req, res);
  });

  app.post('/updateSummoner', function(req, res){
    User.updateSummoner(req, res);
  });

  // Calls to other users

  app.get( '/user/all', function( req, res ) {
    User.getAllProfiles(req, res);
  } );

  app.get('/user/*', function(req, res){ // Fetches a user by displayName, case sensitive!
    User.profileByName(req, res, req.url.split('/')[2]);
  });

  app.get('/user/id/*', function(req, res){ // Fetches a user by id
    User.profileById(req, res, req.url.split('/')[3]);
  });

  // External API routes

  // Gets summoner data based on summoner name
  app.get('/champlist/*', function(req, res) { //get summoner profile info; localhost:3000/lol/na/nexas.json
    res.json(champList[req.url.split('/')[2]])
  });


};

var champList = {"1":"Annie","2":"Olaf","3":"Galio","4":"TwistedFate","5":"XinZhao","6":"Urgot","7":"Leblanc","8":"Vladimir","9":"FiddleSticks","10":"Kayle","11":"MasterYi","12":"Alistar","13":"Ryze","14":"Sion","15":"Sivir","16":"Soraka","17":"Teemo","18":"Tristana","19":"Warwick","20":"Nunu","21":"MissFortune","22":"Ashe","23":"Tryndamere","24":"Jax","25":"Morgana","26":"Zilean","27":"Singed","28":"Evelynn","29":"Twitch","30":"Karthus","31":"Chogath","32":"Amumu","33":"Rammus","34":"Anivia","35":"Shaco","36":"DrMundo","37":"Sona","38":"Kassadin","39":"Irelia","40":"Janna","41":"Gangplank","42":"Corki","43":"Karma","44":"Taric","45":"Veigar","48":"Trundle","50":"Swain","51":"Caitlyn","53":"Blitzcrank","54":"Malphite","55":"Katarina","56":"Nocturne","57":"Maokai","58":"Renekton","59":"JarvanIV","60":"Elise","61":"Orianna","62":"MonkeyKing","63":"Brand","64":"LeeSin","67":"Vayne","68":"Rumble","69":"Cassiopeia","72":"Skarner","74":"Heimerdinger","75":"Nasus","76":"Nidalee","77":"Udyr","78":"Poppy","79":"Gragas","80":"Pantheon","81":"Ezreal","82":"Mordekaiser","83":"Yorick","84":"Akali","85":"Kennen","86":"Garen","89":"Leona","90":"Malzahar","91":"Talon","92":"Riven","96":"KogMaw","98":"Shen","99":"Lux","101":"Xerath","102":"Shyvana","103":"Ahri","104":"Graves","105":"Fizz","106":"Volibear","107":"Rengar","110":"Varus","111":"Nautilus","112":"Viktor","113":"Sejuani","114":"Fiora","115":"Ziggs","117":"Lulu","119":"Draven","120":"Hecarim","121":"Khazix","122":"Darius","126":"Jayce","127":"Lissandra","131":"Diana","133":"Quinn","134":"Syndra","143":"Zyra","150":"Gnar","154":"Zac","157":"Yasuo","161":"Velkoz","201":"Braum","222":"Jinx","236":"Lucian","238":"Zed","245":"Ekko","254":"Vi","266":"Aatrox","267":"Nami","268":"Azir","412":"Thresh","421":"RekSai","429":"Kalista","432":"Bard","223":"TahmKench"};
