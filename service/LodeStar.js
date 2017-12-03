const FlashCards = require('./FlashCards');
const MultipleChoiceQuestions = require('./MultipleChoiceQuestions');
const LongAnswers = require('./LongAnswers');
const Categories = require('./Categories');
const Matchings = require('./Matchings');
const Menus = require('./Menus');
const Crosswords = require('./Crosswords');
const ShortAnswers = require('./ShortAnswers');
const VideoScenarios = require('./VideoScenarios');
const Tiles = require('./Tiles');
const Texts = require('./Texts');

const _ = require('lodash');

class LodeStar {

  constructor (options = {}) {
    this.projectName =  _.get(options, 'interactions[0].interaction[0]._attr.projectName._value');
    this.flashCards =  new FlashCards(options);
    this.multipleChoiceQuestions =  new MultipleChoiceQuestions(options);
    this.longAnswers =  new LongAnswers(options);
    this.categories =  new Categories(options);
    this.matchings =  new Matchings(options);
    this.menus =  new Menus(options);
    this.crosswords =  new Crosswords(options);
    this.shortAnswers =  new ShortAnswers(options);
    this.videoScenarios =  new VideoScenarios(options);
    this.tiles =  new Tiles(options);
    this.texts =  new Texts(options);

  }

  createPages () {
    return {
      flashCards: this.flashCards.getFormData(),
      multipleChoiceQuestions: this.multipleChoiceQuestions.getFormData(),
      longAnswers : this.longAnswers.getFormData(),
      categories: this.categories.getFormData(),
      matchings: this.matchings.getFormData(),
      menus: this.menus.getFormData(),
      crosswords: this.crosswords.getFormData(),
      shortAnswers: this.shortAnswers.getFormData(),
      videoScenarios: this.videoScenarios.getFormData(),
      tiles: this.tiles.getFormData(),
      texts: this.texts.getFormData()
    }
  }

  toString () {
    return `
        projectName: ${this.projectName},
        flashCards: ${this.flashCards.toString()}
        multipleChoiceQuestions: ${this.multipleChoiceQuestions.toString()}
        categories: ${this.categories.toString()}
        matchings: ${this.matchings.toString()}
        menus: ${this.menus.toString()}
        crosswords: ${this.crosswords.toString()}
        shortAnswers: ${this.shortAnswers.toString()}
        videoScenarios: ${this.videoScenarios.toString()}
        tiles: ${this.tiles.toString()}
        texts: ${this.texts.toString()}
    `;
  }

}

module.exports = LodeStar;
