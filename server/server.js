var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

var options = {
  root: __dirname + '/public',
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
}

app.get('/', function(req, res){
  res.render('index');
});

app.listen(port);
console.log('Listening on port ' + port);
