var express = require('express');
var app = express();

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

app.listen(3000);
console.log('Listening on port ' + 3000);