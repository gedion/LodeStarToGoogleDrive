const FlashCards = require('./FlashCards');
const MultipleChoiceQuestions = require('./MultipleChoiceQuestions');
const LongAnswers = require('./LongAnswers');
const Categories = require('./Categories');
const Matchings = require('./Matchings');

const _ = require('lodash');

class LodeStar {

  constructor (options = {}) {
    this.projectName =  _.get(options, 'interactions[0].interaction[0]._attr.projectName._value');
    this.flashCards =  new FlashCards(options);
    this.multipleChoiceQuestions =  new MultipleChoiceQuestions(options);
    this.longAnswers =  new LongAnswers(options);
    this.categories =  new Categories(options);
    this.matchings =  new Matchings(options);
  }

  createPages () {
    return {
      flashCards: this.flashCards.getFormData(),
      multipleChoiceQuestions: this.multipleChoiceQuestions.getFormData(),
      longAnswers : this.longAnswers.getFormData(),
      categories: this.categories.getFormData(),
      matchings: this.matchings.getFormData()
    }
  }

  toString () {
      return `
        projectName: ${this.projectName},
        flashCards: ${this.flashCards.toString()}
        multipleChoiceQuestions: ${this.multipleChoiceQuestions.toString()}
        categories: ${this.categories.toString()}
        matchings: ${this.matchings.toString()}
    `;
  }

}

module.exports = LodeStar;
