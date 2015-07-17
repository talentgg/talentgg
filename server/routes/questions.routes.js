var Question = require('../controllers/questions.controller.js');
var passport = require('passport');

module.exports = function(app) {

app.get('/questions', function(req, res, next) {
    var qs = Question.getAllQuestions();
    res.send(qs);
  });



};
