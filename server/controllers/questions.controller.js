var Question = require('../models/question.model');
var passport = require('passport');

module.exports = {

  //create a new User
  getAllQuestions: function(req, res, next) {
    // console.log(req.body);
    // Question.findAll()
    //     .then(function() {
    var questions = [{
      questionText: "How do you want to change testprofile1?",
      answers: [{
        label: "add 10 to attribute1",
        value: 1,
        effects: [10],
        categories: ["attribute1"]
      }, {
        label: "subtract 10 from attribute1",
        value: 2,
        effects: [-10],
        categories: ["attribute1"]
      }, {
        label: "change attribute2 -10",
        value: 3,
        effects: [-10],
        categories: ["attribute2"]
      }, {
        label: "change attribute5 -5 and attribute3 -7",
        value: 4,
        effects: [-5, -7],
        categories: ["attribute5", "attribute3"]
      }],
      potential: []
    }, {
      questionText: "Does this work?",
      answers: [{
        label: "yes",
        value: 1,
        effects: [10],
        categories: ["attribute1"]
      }, {
        label: "no",
        value: 2,
        effects: [-10],
        categories: ["attribute1"]
      }, {
        label: "change attribute2 -10",
        value: 3,
        effects: [-10],
        categories: ["attribute2"]
      }, {
        label: "change attribute5 -5 and attribute3 -7",
        value: 4,
        effects: [-5, -7],
        categories: ["attribute5", "attribute3"]
      }],
      potential: []
    }];

    return questions;
    // });
  }

};
