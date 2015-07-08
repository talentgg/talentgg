var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var options = {
  root: __dirname + '/public',
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
}

app.get('/', function(req, res){
  res.sendFile('index.html', options);
});

app.listen(port);
console.log('Listening on port ' + port);