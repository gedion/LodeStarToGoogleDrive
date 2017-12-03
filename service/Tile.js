const _ = require("lodash");
const Choices = require("./Choices.js");
const striptags = require('striptags');

class Tile {

  constructor (options = {}) {
    this.options = options;
    this.setQuestionStem();
    this.setCategory();
    this.setFeedback();
    this.setPoints();
    let choiceKeys = ['Distractor_1','Distractor_2','Distractor_3','Correct_Answer'];
    let choices = _.pick(this.options, choiceKeys);
    let correctChoiceIndex;
    let index = 0;
    choices = _.map(choices, (value, key) => {
      if (key === 'Correct_Answer' ) {
        correctChoiceIndex = index;
      }
      index++;
      return {input:value};
    });
    this.choices = new Choices(choices, []);
    this.choices.setCorrect(correctChoiceIndex);
  }

  getChoices () {
    return this.choices.getFormData();
  }

  getCategory () {
    this.setCategory();
    return this.category;
  }

  getFeedback () {
    this.setFeedback();
    return this.feedback;
  }

  getQuestionStem () {
    this.setQuestionStem();
    return this.questionStem;
  }

  getPoints () {
    this.setPoints();
    return this.points;
  }

 setQuestionStem (questionStem = null) {
    this.questionStem = questionStem;
    if (_.isEmpty(this.questionStem)) {
      try {
        this.questionStem =  _.get(this.options, `Question_Stem[0]._text`);
      } catch(error) {
        console.log(`Error setting Tile Question stem: ${error}`);
      }
    }
 }

 setPoints (points = null) {
    this.points = points;
    if (_.isEmpty(this.points)) {
      try {
        this.points =  _.get(this.options, `Points[0]._text`);
      } catch(error) {
        console.log(`Error setting Tile points : ${error}`);
      }
    }
 }

 setCategory (category= null) {
    this.category = category;
    if (_.isEmpty(this.category)) {
      try {
        this.category = _.get(this.options, `Category[0]._text`);
      } catch(error) {
        console.log(`Error setting Tile catgeroy: ${error}`);
      }
    }
 }

 setFeedback (feedback = null) {
    this.feedback = feedback;
    if (_.isEmpty(this.feedback)) {
      try {
        this.feedback = _.get(this.options, `Feedback[0]._text`);
      } catch(error) {
        console.log(`Error setting VideoScenario feedback: ${error}`);
      }
    }
 }

  toString() {
    return `
      feedback: ${this.feedback},
      category: ${this.category},
      points: ${this.points},
      questionStem: ${this.questionStem},
      choices: ${this.choices}
    `;
  }

}

module.exports = Tile;
