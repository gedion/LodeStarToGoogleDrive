const FlashCards = require('./FlashCards.js');
const MultipleChoiceQuestions = require('./MultipleChoiceQuestions.js');
const LongAnswers = require('./LongAnswers.js');
const _ = require('lodash');

class LodeStar {

  constructor (options = {}) {
    this.projectName =  _.get(options, 'interactions[0].interaction[0]._attr.projectName._value');
    this.flashCards =  new FlashCards(options);
    this.multipleChoiceQuestions =  new MultipleChoiceQuestions(options);
    this.longAnswers =  new LongAnswers(options);
  }

  createPages () {
    return {
      flashCards: this.flashCards.getFormData(),
      multipleChoiceQuestions: this.multipleChoiceQuestions.getFormData(),
      longAnswers : this.longAnswers.getFormData()
    }
  }

  toString () {
      return `
      projectName: ${this.projectName},
        flashCards: ${this.flashCards.toString()}
        MultipleChoiceQuestions: ${this.multipleChoiceQuestions.toString()}
    `;
  }
}

module.exports = LodeStar;
