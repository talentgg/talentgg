var Question = require('../controllers/questions.controller.js');
var passport = require('passport');
var handle = require('./handler');
var db = require('../config/db.js');

module.exports = function(app) {

app.get('/questions', function(req, res, next) {
    var qs = Question.getAllQuestions();    
    res.send(qs);
  });

  

};
